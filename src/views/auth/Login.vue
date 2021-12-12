<template>
  <form @submit.prevent="handleSubmit">
    <h2>Log in</h2>
    <div class="form-group">
      <label for="email">Mail address</label>
      <input required type="text" id="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input required type="password" id="password" v-model="password">
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core"
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')
    const { login, error } = useLogin()
    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        router.push({ name: 'Home' })
      }
    }

    return { email, password, handleSubmit, error }
  }
})
</script>

<style>
</style>