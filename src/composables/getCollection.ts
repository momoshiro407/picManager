import { firestore } from "@/firebase/config"
import PictureContainer from "@/types/PictureContainer"
import { ref } from "vue"
import getUser from '@/composables/getUser'
import { GetCollectionUtilType } from "@/types/ComporsableUtilTypes"

const getCollection = (collection: string): GetCollectionUtilType => {
  const documents = ref<PictureContainer[]>([])
  const error = ref<string | null>(null)
  const { user } = getUser()

  firestore.collection(collection).orderBy('createdAt')
    .where("userId", "==", user.value!.uid)
    .get()
    .then(querySnapshot => {
      documents.value = <PictureContainer[]>querySnapshot.docs.map(doc => doc.data())
    })
    .catch(err => {
      error.value = err.message
    })

    return { documents, error }
}

export default getCollection