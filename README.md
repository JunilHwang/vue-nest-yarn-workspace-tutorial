# Yarn Workspace를 이용한 프로젝트 관리

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

다만 devDependency에 정의한 것들은 각각의 node_modules에서 관리하게 된다.

그리고 이렇게 만들 경우 server와 client에서 domain이나 adapter를 공유할 수 있기 때문에 재사용성이 좋아진다.