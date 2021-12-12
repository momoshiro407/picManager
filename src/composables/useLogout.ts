import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { LogoutUtilType } from '@/types/ComporsableUtilTypes'

const error = ref(null)

const logout = async () => {
  error.value = null

  await auth.signOut()
    .catch((err) => {
      error.value = err.message
    })

}

const useLogout = (): LogoutUtilType => {
  return { logout, error }
}

export default useLogout