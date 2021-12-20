<template>
  <Navbar />
  <div class="contents">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '@/components/Navbar.vue'

export default defineComponent({
  components: { Navbar }
})
</script>


<style>
  .contents {
    margin: 0 auto;
  }
</style>
