<template>
  <!-- TODO: 暫定のテンプレートなので後でスタイルを調整する -->
  <h2>Upload pictures</h2>
  <form @submit.prevent="handleSubmit">
    <input type="file" @change="handleChange">
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <div v-if="error" class="error">{{ error }}</div>
    <button :disabled="!canUpload">アップロード</button>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from "@vue/runtime-core"
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import { timestamp } from '@/firebase/config'
import getUser from '@/composables/getUser'

export default defineComponent({
  name: 'AddPictures',
  setup() {
    const file = ref<File | null>(null)
    const fileError = ref<string | null>(null)
    const canUpload = ref(false)
    const fileTypes = ['image/jpeg', 'image/png', 'image/gif']

    const { url, filePath, uploadPicture } = useStorage()
    const { error, addDoc } = useDocument('containers')
    const { user } = getUser()

    const handleSubmit = async () => {
      if (file.value) {
        // storageに画像を登録する
        await uploadPicture(file.value)
        // 画像情報をまとめたcontainerを作成する
        await addDoc({
          url: url.value,
          filePath: filePath.value,
          userId: user.value!.uid,
          createdAt: timestamp()
        })
      }
    }

    const handleChange = (event: Event) => {
      const selected = (event.target as HTMLInputElement).files![0]

      if (selected && fileTypes.includes(selected.type)) {
        file.value = selected
        fileError.value = null
        canUpload.value = true
      } else {
        file.value = null
        fileError.value = '選択可能なファイル形式はjpeg, png, gifのみです'
        canUpload.value = false
      }

    }

    return { error, fileError, canUpload, handleSubmit, handleChange }
  }
})
</script>

<style>

</style>