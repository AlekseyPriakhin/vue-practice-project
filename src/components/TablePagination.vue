<template>
  <ul :class="style['pagination']">
    <li 
      class="material-icons"
      :class="style['previous']"
    >
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
      :class="[style['pagination-item'], style['page-btn-with-num']]"
    >
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ [style.active]: page.isDisabled }"
        :aria-label="`Go to page number`"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li 
      class="material-icons"
      :class="style['next']"
    >
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


<script setup>

import { toRef, computed, defineProps, defineEmits, useCssModule} from "vue";

const emits = defineEmits(["toPage"]);

const props = defineProps({
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
})

const style = useCssModule();

const maxVisibleButtons = 6;

const totalPages = toRef(props, "totalPages");
const currentPage = toRef(props, "cp");

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

const startPage = computed(() => {
  let value = 0;
  
  if (currentPage.value <= 3) return 1;

  else if (currentPage.value === totalPages.value)
    return totalPages.value - maxVisibleButtons + 1;

  else if (totalPages.value - currentPage.value < 3)
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
const setNewCurrentPageAndMakeEmit = (page) => emits("toPage", page);

</script>


<style module>

:root
{
  --pagination-button-border-color:#e0e0e0;
  --pagination-button-bg-color:#ffffff;
}

.pagination {
  margin-left: 540px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  list-style: none;
}

.pagination_item {
  padding: 0px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.5px;
}

.pagination button {
  margin: 0px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--pagination-button-border-color);
  border-radius: 4px;
  background: var(--pagination-button-bg-color);
  text-align: center;
}

.page-btn-with-num
{
  margin-left: 9.8px;
}

/* Активная кнопка */

.page-btn-with-num .active {
  background-color: var(--bg-active-color);
  color: var(--font-hover-active-color);
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

