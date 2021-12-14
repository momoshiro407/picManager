<template>
  <div class="list-view">
    <p>Search area</p>
    <ListView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListView from '@/components/ListView.vue'

export default defineComponent({
  name: 'Home',
  components: { ListView }
});
</script>

<style scoped>
  .list-view {
    padding: 20px;
  }
</style>
