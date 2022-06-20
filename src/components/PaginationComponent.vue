
<template>
  <div>
    <ul class="pagination">
      <li class="pagination-item">
        <button type="button" 
        :disabled="isFirstPage"
        class="btn btn-success"
        @click="onPreviousClick"
        aria-label="Go to previous page">	&#60;</button>
      </li>
      <li class="pagination-item" v-for="page in pages" :key="page.name">
        <button
          type="button"
          :disabled="page.isDisabled"
          @click="onClickPage(page.name)"
          class="btn btn-success"
          :class="{ active: page.isDisabled }"
          :aria-label="`Go to page number`"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="pagination-item">
        <button type="button" 
        :disabled="isLastPage"
         class="btn btn-success"
        @click="onNextClick"
        aria-label="Go to next page">></button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxVisibleButtons: 9,
    };
  },
  computed: {
    totalPages() {
      return this.$store.getters.getTotalPages;
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    },
    startPage() {
      if (this.currentPage <= 5) {
        return 1;
      }
      if (this.currentPage === this.totalPages ) {
        return this.totalPages - this.maxVisibleButtons + 3;
      }
      return this.currentPage - 4;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    async onClickPage(page) {
      await this.$store.dispatch("getRecords", page);
    },
    onNextClick()
    {
      this.$store.dispatch("getRecords", this.currentPage + 1);
    },
     onPreviousClick()
    {
      this.$store.dispatch("getRecords", this.currentPage - 1);
    }
    
  },
};
</script>
<style scoped>
/* .active {
  background-color: #4aae9b;
  color: #ffffff;
} */
ul
{
  margin-left: 28%;
}
button{
  margin-left: 0.25rem;
  height: 40px;
  width: 40px;
}
tr
{
  height: 2rem;
}
table
{
  height: 45%;
}
</style>

