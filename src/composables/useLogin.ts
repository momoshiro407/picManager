import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { LoginUtilType } from '@/types/ComporsableUtilTypes'

const error = ref(null)

const login = async (email: string, password: string) => {
  error.value = null

  await auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      error.value = null
    })
    .catch(err => {
      error.value = err.message
    })
}

const useLogin = (): LoginUtilType => {
  return { login, error }
}

export default useLogin