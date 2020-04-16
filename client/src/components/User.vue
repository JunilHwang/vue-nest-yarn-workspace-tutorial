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
import { User as UserType } from 'domain/types'
import { userAdapter } from 'adapter/src'

@Component
export default class User extends Vue {
  private user: UserType|null = null
  async created () {
    this.user = await userAdapter.getUser()
  }
}
</script>