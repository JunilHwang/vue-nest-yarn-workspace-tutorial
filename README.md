# Yarn Workspace를 이용한 프로젝트 관리

yarn의 workspace 기능을 이용한 프로젝트 관리 튜토리얼

## 기본 개념

root directory의 package.json은 다음과 같이 정의 되어 있다.

```json
{
  "private": true,
  "workspaces": [ "server", "client", "domain", "adapter" ]
}
```

이렇게 workspaces에 sub project를 정의한 후 

```sh
> yarn
```

yarn으로 install을 하면 공통 패키지는 root에 생기게 된다.

그리고 이렇게 만들 경우 server와 client에서 domain이나 adapter를 공유할 수 있기 때문에 재사용성이 좋아진다.

## 사용방법

### pacakge.json 정의

``` js
// server/package.json
{
  "name": "server",
  // 중간 생략
  "scripts": { /* 생략 */ },
  "dependencies": { /* 생략 */ },
  "devDependencies": {
    // ... 생략
    "domain": "^1.0.0"
  },
}

// adapter/package.json
{
  "name": "adapter",
  "version": "1.0.0",
  "description": "project adapter",
  "main": "index.js",
  "author": "junilhwang",
  "license": "MIT",
  "dependencies": {
    "axios": "^0.19.2",
    "domain": "1.0.0"
  },
  "devDependencies": {
    "@types/axios": "^0.14.0"
  }
}

// client/package.json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": { /* 생략 */ },
  "devDependencies": {
    /* 생략 */
    "adapter": "^1.0.0",
    "domain": "^1.0.0"
  },
  "browserslist": [ /* 생략 */ ]
}

```

### 로직에 적용

1. [Server의 UserService](/server/src/api/user/user.service.ts)

```ts
import { Injectable } from "@nestjs/common"
import { User } from 'domain/types' // domain을 가져옴

@Injectable()
export class UserService {
  getUser (): User { // 반환 타입으로 사용
    return {
      idx: 1,
      name: 'junil',
      id: 'JunilHwang',
      email: 'tjsdlf4261@naver.com'
    }
  }
}
```

2. [Server의 UserController](/server/src/api/user/user.controller.ts)

```ts
import {Controller, Get} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from 'domain/types' // domain을 가져옴

@Controller('/api/user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Get()
  getUser (): User { // 반환 값으로 사용
    return this.userService.getUser()
  }
}
```

3. [Adapter의 UserAdapter](/adapter/src/UserAdapter.ts)

```ts
import $http from 'axios'
import { User } from 'domain/types' // 도메인을 가져옴

const baseURL: string = '/api/user'

export const userAdapter = Object.freeze({
  async getUser (): Promise<User> { // 반환 값으로 사용
    const { data } = await $http.get(baseURL)
    return data
  }
})
```

4. [Client의 User Component](/client/src/components/User.vue)

```vue
<template>
  <div>
    <ul style="text-align: left; display: inline-block;">
      <li v-for="(v, k) in user" :key="v">
        <strong>{{  k  }}</strong>: {{ v  }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { User as UserType } from 'domain/types' // Domain을 가져옴
import { userAdapter } from 'adapter/src' // Adapter를 가져옴

@Component
export default class User extends Vue {
  private user: UserType|null = null // Domain 타입 사용
  async created () {
    this.user = await userAdapter.getUser() // Adapter 사용
  }
}
</script>
```

## Reference

- https://musma.github.io/2019/04/02/yarn-workspaces.html
- https://simsimjae.tistory.com/384