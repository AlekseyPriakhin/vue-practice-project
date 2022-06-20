<template>
  <div class="mb-3">
    <div class="form-group">
    <input type="text" v-model="searchQueryString" class="form-control " aria-describedby="searchHelp" placeholder="Что вы ищете?">
    <small id="searchHelp" class="form-text text-muted">Поиск можно осуществлять по полям id, полное название, короткое название и код вагона</small>
  </div>

    <table class="table table-striped table-bordered w-100 mt-5 shadow-sm p-3 mb-5 bg-white rounded">
      <thead>
        <tr>
          <th class="w-10" scope="col"><a href="">id</a></th>
          <th class="w-50" scope="col">Полное название</th>
          <th class="w-20" scope="col">Короткое название</th>
          <th class="w-20" scope="col">Код вагона</th>
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
import {debounce} from "../helpers/debounce.js";
export default {
  data() {
    return {
      searchQueryString: "",
    };
  },
  watch: {
    searchQueryString : function() {
      this.debouncedSearch()
    },
  },
  computed: {
    records() {
      return this.$store.getters.getRecords;
    },
  },
  created: function () {
    this.debouncedSearch = debounce(this.search, 750)
  },
  methods: {
    search() {
      if(this.searchQueryString.length > 3 || !this.searchQueryString ) 
      {
        this.$store.dispatch("search",this.searchQueryString);
        this.$store.dispatch("getRecords", 1);
      }
    },
    click() {
      this.$store.dispatch("getRecords", 1);
    },
  },
  mounted() {
    this.$store.dispatch("getRecords", 1);
  },
  components: {
    Pagination,
  },
};
</script>
