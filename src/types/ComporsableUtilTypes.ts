import { Ref } from 'vue'
import firebase from 'firebase/compat'

type BaseUtilType = {
  error: Ref<string | boolean | null>
}

export type SignupUtilType = BaseUtilType & {
  signup: (name: string, email: string, password: string) => Promise<void>
}

export type LoginUtilType = BaseUtilType & {
  login: (email: string, password: string) => Promise<void>
}

export type LogoutUtilType = BaseUtilType & {
  logout: () => Promise<void>
}

export type GetUserUtilType =  {
  user: Ref<firebase.User | null>
}