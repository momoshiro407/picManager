import { ref } from 'vue'
import { storage } from '@/firebase/config'
import getUser from './getUser'
import { UseStorageUtilType } from '@/types/ComporsableUtilTypes'

const { user } = getUser()

const useStorage = (): UseStorageUtilType => {
  const error = ref<string | null>(null)
  const filePath = ref<string>('')
  const url = ref<string>('')

  const uploadPicture = async (file: File) => {
    filePath.value = `pictures/${user.value!.uid}/${file.name}`
    const storageRef = storage.ref(filePath.value)

    await storageRef.put(file)
      .then(async res => {
        await res.ref.getDownloadURL()
          .then(downloadUrl => url.value = downloadUrl)
      })
      .catch(err => {
        error.value = err.message
      })
  }

  return { url, filePath, error, uploadPicture }
}

export default useStorage
