<template>
  <div class="form-group">
    <input
      type="text"
      v-model="searchQueryString"
      class="form-control"
      aria-describedby="searchHelp"
      placeholder="Что вы ищете?"
    />
    <p>
      Поиск можно осуществлять по id, названию, короткому названию и коду вагона
    </p>
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
        <th v-for="header in tableHeaders" :key="header.id">
          <button
            type="button"
            class="sort-button"
            @click.prevent="onSort(header)"
          >
            {{ header.name }}
          </button>
          <table-sort-arrow :option="header.isDesc" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in tableRecords" :key="record.id">
        <th>{{ record.id }}</th>
        <th>{{ record.name }}</th>
        <th>{{ record.short_name }}</th>
        <th>{{ record.code }}</th>
      </tr>
    </tbody>
  </table>
  <pagination :totalPages="totalPages" @toPage="getRecords" />
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useTableHeaders } from "../use/tableHeaders.js";
import { useGetRecords } from "../use/getRecords.js";
import debounce from "lodash.debounce";

import Pagination from "./TablePaginationComponent.vue";
import TableSortArrow from "./TableSortArrows.vue";

export default {
  setup() {
    const searchQueryString = ref("");
    const tableRecords = ref([]);
    const totalPages = ref(1);
    const sortOptions = [];

    const tableHeaders = ref(
      useTableHeaders([
        { id: "id", name: "id" , priority : 1},
        { id: "name", name: "Название", priority : 2 },
        { id: "short_name", name: "Короткое название", priority : 3 },
        { id: "code", name: "Код вагона", priority : 4 },
      ])
    );

    onMounted(async () => {
      const result = await useGetRecords();
      if (result) {
        tableRecords.value = result.data;
        totalPages.value = result.total_pages;
      }
    });

    const getRecords = async (page) => {
      const result = await useGetRecords(
        page,
        searchQueryString.value,
        sortOptions
      );
      if (result) {
        tableRecords.value = result.data;
        totalPages.value = result.total_pages;
      }
    };

    const onSort = (header) => {
      header.isDesc = !header.isDesc;

      //const sortOptionsByPriority = (a,b) => a.priority - b.priority;

      const value = sortOptions.findIndex((option)=> option.id === header.id)
      if(value !== -1) sortOptions[value].isDesc = header.isDesc;
      else 
      {
        sortOptions.push(header); 
        sortOptions.sort((a,b) => a.priority - b.priority);
      }
      getRecords();
    };

    watch(searchQueryString, (value) => {
      searchQueryString.value = value;
      debouncedSearch();
    });

    function search() {
      getRecords();
      console.log(searchQueryString.value);
    }

    const debouncedSearch = debounce(search, 750);

    return {
      totalPages,
      searchQueryString,
      tableHeaders,
      tableRecords,
      getRecords,
      onSort,
    };
  },

  components: {
    Pagination,
    TableSortArrow,
  },
};
</script>


<style scoped>
button.sort-button {
  border: none;
  background-color: rgb(255, 255, 255);
}
</style>