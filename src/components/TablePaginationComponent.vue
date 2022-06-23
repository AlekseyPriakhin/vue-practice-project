<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        :disabled="isFirstPage"
        class="btn btn-success"
        aria-label="Go to previous page"
        @click="onPreviousClick">
        &#60;
      </button>
    </li>
    <li class="pagination-item" v-for="page in pages" :key="page.name">
      <button
        type="button"
        :disabled="page.isDisabled"
        class="btn btn-success"
        :class="{ active: page.isDisabled }"
        :aria-label="`Go to page number`"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isLastPage"
        class="btn btn-success"
        @click="onNextClick"
        aria-label="Go to next page"
      >
        >
      </button>
    </li>
  </ul>
</template>

<script>
import { ref,toRef,computed } from "vue";
export default {
  props:{totalPages : {type:Number,require : true}},
  setup(props,context) {
    const maxVisibleButtons = 9;
    const currentPage = ref(1);

    const totalPages = toRef(props,'totalPages');
    
    
    const isFirstPage = computed(()=>currentPage.value === 1);

    const isLastPage = computed(()=> currentPage.value === totalPages.value)

    const startPage = computed(()=>
    {
      if(currentPage.value <= 5 ) return 1;
      if(currentPage.value === totalPages.value) return totalPages.value-maxVisibleButtons;
      return currentPage.value - 4;
    })

    const endPage = computed(()=> Math.min(totalPages.value,startPage.value + maxVisibleButtons - 1));
    
    const pages = computed(()=>
    {
    const range = []
     for(let i = startPage.value;i<= endPage.value;i++ ) {
     range.push({name : i,isDisabled : i === currentPage.value});
     }
     return range;
    });

    const onClickPage = (page)=> setNewCurrentPggeAndMakeEmit(page)

    const onNextClick = ()=> setNewCurrentPggeAndMakeEmit(currentPage.value + 1)

    const onPreviousClick = ()=> setNewCurrentPggeAndMakeEmit(currentPage.value- 1)



    function setNewCurrentPggeAndMakeEmit(page)
    {
      currentPage.value = page;
      context.emit('toPage',page)
    }

    return { pages,
    isFirstPage,
    isLastPage,
    onClickPage,
    onNextClick,
    onPreviousClick, };
  },
};
</script>

<style scoped>
.pagination-item{
  margin-left: 2px;
  border-radius: 5px;
}
.pagination
{
  margin-left: 30%;
}
</style>

