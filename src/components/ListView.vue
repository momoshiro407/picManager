<template>
  <div class="thumbnail-container">
    <div class="thumbnail" v-for="(url, index) in displayImages" :key="index">
      <router-link :to="{ name: 'Home' }">
        <img :src="url">
      </router-link>
    </div>
  </div>
  <div>
    <Pagination
      :total="dummyImages.length"
      :imagesPerPage="imagesPerPage"
      :displayRange="displayRange"
      @currentPage="updateCurrentPage($event)"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { computed, defineComponent } from '@vue/runtime-core'
import Pagination from '@/components/Pagination.vue'

export default defineComponent({
  components: { Pagination },
  setup() {
    // FirebaseStrageと連携する前の確認用ダミー画像データ
    const imageSet = [
      require('@/assets/image/green.jpg'),
      require('@/assets/image/red.jpg'),
      require('@/assets/image/blue.jpg'),
    ]
    // 三種類の画像をランダムに選んで配列に格納する
    const dummyImages = new Array(103).fill(null).map(() => imageSet[Math.floor(Math.random() * 3)])
    
    // ページング関係のパラメータ
    const currentPage = ref(1) // 現在の表示ページの番号（初期は1）
    const imagesPerPage = 20 // 1ページあたりの画像の表示件数
    const displayRange = 9 // ページ番号ボタンの最大表示数

    const updateCurrentPage = (page: number) => {
        currentPage.value = page
    }

    // 現在のページに表示する画像だけを抽出する
    const displayImages = computed(() => {
      const startIndex = (currentPage.value - 1) * imagesPerPage
      const endIndex = startIndex + imagesPerPage
      return dummyImages.slice(startIndex, endIndex)
    })
    
    return { dummyImages, currentPage, imagesPerPage, displayRange, updateCurrentPage, displayImages }
  }
})
</script>

<style scoped>
  .thumbnail-container {
    display: flex;
    flex-wrap: wrap;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); */
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