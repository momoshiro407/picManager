import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { GetUserUtilType } from '@/types/ComporsableUtilTypes'

const user = ref(auth.currentUser)

auth.onAuthStateChanged(_user => {
  user.value = _user
})

const getUser = (): GetUserUtilType => {
  return { user }
}

export default getUser