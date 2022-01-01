import firebase from 'firebase/compat'

interface PictureContainer {
  url: string,
  filePath: string,
  userId: string,
  createdAt: firebase.firestore.FieldValue,
}

export default PictureContainer