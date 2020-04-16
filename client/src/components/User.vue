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
import { User as UserType } from 'domain'

@Component
export default class User extends Vue {
  private user: UserType = {
    idx: 1,
    id: 'JunilHwang',
    name: '황준일',
    email: 'junil.h@kakao.com'
  }
}
</script>