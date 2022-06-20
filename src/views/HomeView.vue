<template>
  <div class="mb-3">
    <div class="form-group">
      <input
        type="text"
        v-model="searchQueryString"
        class="form-control"
        aria-describedby="searchHelp"
        placeholder="Что вы ищете?"
      />
      <img src="@/assets/search.png" alt="Поиск">
      <small id="searchHelp" class="form-text text-muted"
        >Поиск можно осуществлять по полям id, полное название, короткое
        название и код вагона</small
      >
    </div>

    <table
      class="
        table table-striped table-bordered
        w-100
        mt-5
        shadow-sm
        p-3
        mb-5
        bg-white
        rounded
      "
    >
      <thead>
        <tr>
          <th class="w-10" scope="col">
            <a href="" role="button" @click.prevent="onSort('id')">id</a>
            <arrows :option="sortBy[0].isDesc"></arrows>
          </th>
          <th class="w-50" scope="col">
            <a href="" role="button" @click.prevent="onSort('name')"
              >Полное название</a>
              <arrows :option="sortBy[1].isDesc"></arrows>
          </th>
          <th class="w-20" scope="col">
            <a href="" role="button" @click.prevent="onSort('short_name')"
              >Короткое название</a>
              <arrows :option="sortBy[2].isDesc"></arrows>
          </th>
          <th class="w-20" scope="col">
            <a href="" role="button" @click.prevent="onSort('code')"
              >Код вагона</a>
              <arrows :option="sortBy[3].isDesc"></arrows>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" v-bind:key="record.id">
          <th>{{ record.id }}</th>
          <th>{{ record.name }}</th>
          <th>{{ record.short_name }}</th>
          <th>{{ record.code }}</th>
        </tr>
      </tbody>
    </table>
    <pagination></pagination>
  </div>
</template>

<script>
import Pagination from "../components/PaginationComponent.vue";
import Arrows from "../components/TableSortArrows.vue";
import { debounce } from "../helpers/debounce.js";
export default {
  data() {
    return {
      searchQueryString: "",
    };
  },
  watch: {
    searchQueryString: function () {
      this.debouncedSearch();
    },
  },
  computed: {
    records() {
      return this.$store.getters.getRecords;
    },
    sortBy() {
      return this.$store.getters.getSortOptions;
    },
  },
  created: function () {
    this.debouncedSearch = debounce(this.search, 750);
  },
  methods: {
    search() {
      if (this.searchQueryString.length > 3 || !this.searchQueryString) {
        this.$store.dispatch("search", this.searchQueryString);
        this.$store.dispatch("getRecords");
      }
    },
    onSort(col) {
      this.$store.dispatch("sort", col);
      this.$store.dispatch("getRecords");
    },
  },
  mounted() {
    this.$store.dispatch("getRecords");
  },

  components: {
    Pagination,
    Arrows,
  },
};
</script>

<style scoped>

img{
  width:20px;
  height: 20px;
}


</style>
