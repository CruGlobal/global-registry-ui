import { USER_LOGIN, USER_LOGIN_DEFAULT } from '../constants'

export const userLogin = (accessToken) => ({
  type: USER_LOGIN,
  accessToken
})

export const resetUserLogin = () => ({type: USER_LOGIN_DEFAULT})
