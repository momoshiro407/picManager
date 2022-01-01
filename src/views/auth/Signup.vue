<template>
  <form @submit.prevent="handleSubmit">
    <h2>ユーザ登録</h2>
    <div class="form-group">
      <label for="name">ユーザ名</label>
      <input required type="text" id="name" v-model="name">
    </div>
    <div class="form-group">
      <label for="email">メールアドレス</label>
      <input required type="text" id="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">パスワード</label>
      <input required type="password" id="password" v-model="password">
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <button>登録</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core"
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const { signup, error } = useSignup()
    const router = useRouter()

    const handleSubmit = async () => {
      await signup(name.value, email.value, password.value)
      if (!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return { name, email, password, handleSubmit, error }
  }
})
</script>

<style>

</style>