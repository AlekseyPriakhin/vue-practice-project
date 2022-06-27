<template>
  <ul class="pagination">
    <li class="material-icons previous">
      <button
        type="button"
        aria-label="Go to previous page"
        :disabled="isFirstPage"
        @click="onPreviousClick"
      >
        chevron_left
      </button>
    </li>
    <li
      v-for="page in pages"
      :key="page.name"
      class="pagination-item page-btn-with-num"
    >
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: page.isDisabled }"
        :aria-label="`Go to page number`"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="material-icons next">
      <button
        type="button"
        aria-label="Go to next page"
        :disabled="isLastPage"
        @click="onNextClick"
      >
        chevron_right
      </button>
    </li>
  </ul>
</template>

<script>
import { toRef, computed } from "vue";

export default {
  props: {
    totalPages: { 
      type: Number, 
      require: true, 
      default : 1
      },
    cp: { 
      type: Number, 
      require: true, 
      default : 1 
      }
  },

  emits: ["toPage"],

  setup(props, context) {

    const maxVisibleButtons = 6;
    const totalPages = toRef(props, "totalPages");
    const currentPage = toRef(props, "cp");

    const isFirstPage = computed(() => currentPage.value === 1);
    const isLastPage = computed(() => currentPage.value === totalPages.value);

    const startPage = computed(() => {
      let value = 0;
      if (currentPage.value <= 3) return 1;

      if (currentPage.value === totalPages.value)
        return totalPages.value - maxVisibleButtons + 1;

      if (totalPages.value - currentPage.value < 3)
        value = 3 - (totalPages.value - currentPage.value);

      return currentPage.value - 2 - value;
    });

    const endPage = computed(() =>
      Math.min(totalPages.value, startPage.value + maxVisibleButtons - 1)
    );

    const pages = computed(() => {
      const range = [];
      for (let i = startPage.value; i <= endPage.value; i++) {
        range.push({ name: i, isDisabled: i === currentPage.value });
      }

      return range;
    });

    const onClickPage = (page) => setNewCurrentPageAndMakeEmit(page);

    const onNextClick = () => setNewCurrentPageAndMakeEmit(currentPage.value + 1);

    const onPreviousClick = () => setNewCurrentPageAndMakeEmit(currentPage.value - 1);

    const setNewCurrentPageAndMakeEmit = (page) => context.emit("toPage", page);

    return {
      pages,
      isFirstPage,
      isLastPage,
      onClickPage,
      onNextClick,
      onPreviousClick,
    };
  },
};
</script>

<style scoped>
.pagination {
  margin-left: 540px;
}

.pagination-item {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5px;
  padding: 0px;
}

.pagination button {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 0px;
  width: 34px;
  height: 34px;
  background: #ffffff;
  text-align: center;
}

.page-btn-with-num
 {
  margin-left: 9.8px;
}

/* Активная кнопка */

.page-btn-with-num
 .active {
  background-color: #6b8cad;
  color: #f2f2f2;
}

.pagination :nth-child(2) {
  margin-left: 0px;
}

.next,
.previous {
  width: 34px;
  height: 34px;
}

.next button,
.previous button {
  padding: 4px;
}

.next {
  margin-left: 14.8px;
}

.previous {
  margin-right: 14.8px;
}
</style>

