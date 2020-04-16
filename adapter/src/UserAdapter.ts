import $http from 'axios'
import { User } from 'domain/types'

const baseURL: string = '/api/user'

export const userAdapter = Object.freeze({
  async getUser (): Promise<User> {
    const { data } = await $http.get(baseURL)
    return data
  }
})