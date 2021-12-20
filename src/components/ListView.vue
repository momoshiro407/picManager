<template>
  <div class="thumbnail-list">
    <div class="thumbnail" v-for="image in dummyImages" :key="image.index">
      <router-link :to="{ name: 'Home' }">
        <img :src="image.url">
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    // FirebaseStrageと連携する前の確認用ダミー画像データ
    const dummyImages = [
      { index: 0, url: require('@/assets/image/gardenia2.jpeg') },
      { index: 1, url: require('@/assets/image/roserade2.jpg') },
      { index: 2, url: require('@/assets/image/koara.jpg') },
      { index: 3, url: require('@/assets/image/gardenia.jpeg') },
      { index: 4, url: require('@/assets/image/roserade3.jpeg') },
      { index: 5, url: require('@/assets/image/シャーレとディアラ.png') }
    ]
    
    return { dummyImages }
  }
})
</script>

<style scoped>
  .thumbnail-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  }
  .thumbnail {
    display: flex;
    background: #e8ecd9;
    margin-top: 20px;
    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;
    /* box-sizing: border-box; */
  }
  img {
    max-width: 195px;
    max-height: 195px;
  }
</style>