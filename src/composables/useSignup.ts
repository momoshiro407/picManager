import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { SignupUtilType } from '@/types/ComporsableUtilTypes'

const error = ref(null)

const signup = async (name: string, email: string, password: string) => {
  error.value = null

  await auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      res.user?.updateProfile({ displayName: name })
      error.value = null
    })
    .catch(err => {
      error.value = err.message
    })
}

const useSignup = (): SignupUtilType => {
  return { signup, error }
}

export default useSignup