<template>
  <div class="thumbnail-container">
    <div class="thumbnail" v-for="(container, index) in displayContainers" :key="index">
      <router-link :to="{ name: 'Home' }">
        <img :src="container.url">
      </router-link>
    </div>
  </div>
  <div v-if="showPagination">
    <Pagination
      :total="containers.length"
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
import getCollection from '@/composables/getCollection'

export default defineComponent({
  components: { Pagination },
  setup() {
    const { documents: containers } = getCollection('containers')
    
    // ページング関係のパラメータ
    const currentPage = ref(1) // 現在の表示ページの番号（初期は1）
    const imagesPerPage = 20 // 1ページあたりの画像の表示件数
    const displayRange = 9 // ページ番号ボタンの最大表示数

    const updateCurrentPage = (page: number) => {
        currentPage.value = page
    }

    // ページングエリアの表示制御
    const showPagination = computed(() => {
      return containers.value.length !== 0
    })

    // 現在のページに表示する画像だけを抽出する
    const displayContainers = computed(() => {
      const startIndex = (currentPage.value - 1) * imagesPerPage
      const endIndex = startIndex + imagesPerPage
      return containers.value.slice(startIndex, endIndex)
    })
    
    return { imagesPerPage, displayRange, updateCurrentPage, showPagination, displayContainers, containers }
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
