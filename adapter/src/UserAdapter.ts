import $http from 'axios'

const baseURL: string = '/api/user'

export const userAdapter = Object.freeze({
  async getUser () {
    const { data } = await $http.get(baseURL)
    return data
  }
})