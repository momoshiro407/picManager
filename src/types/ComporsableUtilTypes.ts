import { Ref } from 'vue'
import firebase from 'firebase/compat'

type BaseRef = Ref<string | boolean | null>

export type SignupUtilType = {
  [key: string]: BaseRef | ((name: string, email: string, password: string) => void)
}

export type LoginUtilType = {
  [key: string]: BaseRef | ((email: string, password: string) => void)
}

export type LogoutUtilType = {
  [key: string]: BaseRef | (() => void)
}

export type GetUserUtilType =  {
  [key: string]: Ref<firebase.User | null>
}