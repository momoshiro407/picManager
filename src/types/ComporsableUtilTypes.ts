import { Ref } from 'vue'
import firebase from 'firebase/compat'
import PictureContainer from './PictureContainer'

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

export type GetCollectionUtilType = BaseUtilType & {
  documents: Ref<PictureContainer[]>
}

export type UseDocumentUtilType = BaseUtilType & {
  addDoc: (doc: PictureContainer) => Promise<void>
}

export type UseStorageUtilType = BaseUtilType & {
  url: Ref<string>,
  filePath: Ref<string>,
  uploadPicture: (file: File) => Promise<void>
}
