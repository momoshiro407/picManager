<template>
  <div class="navbar">
    <nav>
      <h1><router-link :to="{ name: 'Home' }">Pic Manager</router-link></h1>
      <div class="links">
        <div v-if="user">
          <span>{{ user.displayName }}</span>
          <a class="btn" @click="handleClick">Log out</a>
        </div>
        <div v-else>
          <router-link v-if="!user" class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
          <router-link v-if="!user" class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const { user } = getUser()
    const { logout, error } = useLogout()
    const router = useRouter()

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        router.push({ name: 'Login' })
      }
    }

    return { user, handleClick, error }
  }
})

</script>

<style scoped>
  .navbar {
    padding: 15px 10px;
    background: white;
  }
  nav {
    display: flex;
    margin: 0 auto;
    align-items: center;
}
  nav h1 {
    margin-left: 20px;
  }
  nav .link {
    margin-left: auto;
    width: 100%;
    max-width: 1200px;
    text-align: right;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
</style>