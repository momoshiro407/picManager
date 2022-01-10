<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li v-if="!isLowerEnd" class="arrow" @click.prevent="setCurrentPage(1)">&lt;&lt;</li>
      <li v-if="!isLowerEnd" class="arrow" @click.prevent="setCurrentPage(currentPage - 1)">&lt;</li>
      <li v-for="page in displayPages"
        :key="page"
        @click.prevent="setCurrentPage(page)"
        :class="page === currentPage ? 'active' : 'inactive'"
      >
        {{ page }}
      </li>
      <li v-if="!isUpperEnd" class="arrow" @click.prevent="setCurrentPage(currentPage + 1)">&gt;</li>
      <li v-if="!isUpperEnd" class="arrow" @click.prevent="setCurrentPage(pages.length)">&gt;&gt;</li>
    </ul>
  </div>
  <div>
    {{ displayInfo }}
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { computed, defineComponent } from "@vue/runtime-core"

export default defineComponent ({
  props: {
    total: {
      required: true,
      type: Number
    },
    imagesPerPage: {
      required: true,
      type: Number
    },
    displayRange: {
      required: true,
      type: Number
    },
  },
  emits: ['currentPage'],
  setup(props, context) {
    const currentPage = ref(1)

    // 1から始まるページ番号を要素として持つ配列を作成する
    const pages = computed(() => {
      return new Array(Math.ceil(props.total / props.imagesPerPage)).fill(null).map((e, i) => i + 1)
    })

    // ページ送りボタン（<<, <, >, >>）の表示制御フラグ
    const isLowerEnd = computed(() => {
      return currentPage.value === 1
    })
    const isUpperEnd = computed(() => {
      return currentPage.value === pages.value.length
    })

    // ページ番号ボタンの表示制御
    const displayPages = computed(() => {
      // 最大でdisplayRange個のページ番号ボタンを表示する
      if (pages.value.length > props.displayRange) {
        let lowerIndex = currentPage.value - Math.floor(props.displayRange / 2) - 1
        let upperIndex = currentPage.value + Math.floor(props.displayRange / 2) - 1
        if (lowerIndex < 0) {
          lowerIndex = 0
        }
        if (upperIndex > pages.value.length - 1) {
          lowerIndex = pages.value.length - props.displayRange
        }
        return pages.value.slice(0, pages.value.length).splice(lowerIndex, props.displayRange)
      } else {
        return pages.value
      }
    })

    const displayInfo = computed(() => {
      const start = (currentPage.value - 1) * props.imagesPerPage + 1
      const end = Math.min(currentPage.value * props.imagesPerPage, props.total)
      
      return `${ props.total }件中 ${ start } - ${ end }件を表示`
    })

    // 選択中のページ番号でcurrentPageを更新し、親コンポーネントに選択ページ番号の情報を送る
    const setCurrentPage = (page: number) => {
      if (page >= 1 && page <= pages.value.length ) {
        currentPage.value = page
        context.emit('currentPage', page)
      }
    }

    return { pages, currentPage, isLowerEnd, isUpperEnd, displayPages, displayInfo, setCurrentPage }
  }

})

</script>

<style scoped>
  .pagination-container {
    display: flex;
    margin: 10px 0;
    justify-content: center;
  }
  .pagination {
    display: flex;
    list-style-type: none;
  }
  li {
    margin: 0 1px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border-radius: 3px;
    padding: 6px 12px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    font-weight: bold;
    color: #ffffff;
    background: #5abb6a;
  }
  .inactive, .arrow {
    background: #ffffff;
  }
  .inactive:hover, .arrow:hover  {
    background: #c6e6cb;
  }
</style>
