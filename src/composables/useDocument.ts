import { ref } from 'vue'
import { firestore } from '@/firebase/config'
import PictureContainer from '@/types/PictureContainer'
import { UseDocumentUtilType } from '@/types/ComporsableUtilTypes'

const useDocument = (collection: string): UseDocumentUtilType => {
  const error = ref<string | null>(null)

  const addDoc = async (doc: PictureContainer) => {
    error.value = null

    await firestore.collection(collection).add(doc)
      .catch(err => {
        error.value = err.message
      })

  }

  return { error, addDoc }
}

export default useDocument