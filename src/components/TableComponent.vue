<template>
  <div>
    <input
      v-model="searchQueryString"
      type="text"
      class="input-search"
      aria-describedby="searchHelp"
      placeholder="Что вы ищете?"
    >
    <p class="material-icons search">
      search
    </p>
    <hr class="divider">
    <p class="search-input-help">
      Поиск можно осуществлять по id, названию, короткому названию и коду вагона
    </p>
  </div>
  <table class="main-table">
    <thead>
      <tr>
        <td 
          v-for="header in tableHeaders" 
          :key="header.id"
        >
          <button
            type="button"
            class="sort-button"
            @click.prevent="onSort(header)"
          >
            {{ header.name }}
          </button>
          <table-sort-arrow :option="header.isDesc" />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="record in tableRecords" 
        :key="record.id"
      >
        <td>{{ record.id }}</td>
        <td>{{ record.name }}</td>
        <td>{{ record.short_name }}</td>
        <td>{{ record.code }}</td>
      </tr>
    </tbody>
  </table>
  <pagination 
    :total-pages="totalPages" 
    :cp="currentPage" 
    @to-page="setRecords" 
  />
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useTableHeaders } from "../use/tableHeaders.js";
import { getRecords } from "../services/CarTypesService.js";
import debounce from "lodash.debounce";

import Pagination from "./TablePaginationComponent.vue";
import TableSortArrow from "./TableSortArrows.vue";

export default {
  components: {
    Pagination,
    TableSortArrow,
  },
  
  setup() {
    const searchQueryString = ref("");
    const tableRecords = ref([]);
    const totalPages = ref(1);
    const currentPage = ref(1);
    const sortOptions = [];
    const per_page = 10;

    const tableHeaders = ref(
      useTableHeaders([
        { id: "id", name: "id", priority: 1 },
        { id: "name", name: "Полное название", priority: 2 },
        { id: "short_name", name: "Короткое название", priority: 3 },
        { id: "code", name: "Код вагона", priority: 4 },
      ])
    );

    onMounted(async () => setRecords());

    const setRecords = async (page) => {
      const result = await getRecords(
        page,
        searchQueryString.value,
        sortOptions
      );
      if (result) {
        tableRecords.value = result.data;
        if (tableRecords.value.length < per_page) {
          for (let i = tableRecords.value.length + 1; i <= per_page; i++) {
            tableRecords.value.push({});
          }
        }
        currentPage.value = result.page;
        totalPages.value = result.total_pages;
      }
    };

    const onSort = (header) => {
      header.isDesc = !header.isDesc;

      const value = sortOptions.findIndex((option) => option.id === header.id);
      if (value !== -1) sortOptions[value].isDesc = header.isDesc;
      else {
        sortOptions.push(header);
        sortOptions.sort((a, b) => a.priority - b.priority);
      }
      setRecords();
    };

    watch(searchQueryString, (value) => {
      if (value.length > 3 || value.length === 0) {
        searchQueryString.value = value;
        debouncedSearch();
      }
    });

    const search = () => setRecords();

    const debouncedSearch = debounce(search, 750);

    return {
      totalPages,
      searchQueryString,
      tableHeaders,
      tableRecords,
      setRecords,
      onSort,
      currentPage,
    };
  },
};
</script>


<style scoped>
/* START: Стили для строки поиска */

.input-search {
  width: 1319px;
  height: 24px;
  outline: none;
  border-width: 0px;
  margin-bottom: 8px;
}

.input-search::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: rgba(0, 0, 0, 0.87);
}

.search-input-help {
  margin-bottom: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.4);
}

.search {
  position: absolute;
  color: #e21a1a;
  font-size: 32px;
  margin-bottom: 9px;
}

.divider {
  margin: 0px;
  width: 1319px;
  margin-bottom: 1px;
}

/* END: Стили для строки поиска */

/* START : тело таблицы */

.main-table {
  padding: 0px;
  margin-bottom: 56.8px;
  width: 1359px;
  height: 568px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 4px;
}

.main-table td {
  height: 51.5px;
  padding: 10px 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
}

.main-table tbody tr:nth-child(odd) {
  background: #f8f8f8;
}

.main-table tbody tr:hover td {
  background-color: #6b8cad;
  color: #f2f2f2;
}

/* END : тело таблицы */

/* START : заголовки таблицы */

button.sort-button {
  border: none;
  padding: 0px;
  background-color: rgb(255, 255, 255);
}

/* Шрифт в первой колонке */
.main-table thead tr :nth-child(1) button {
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.87);
}

/* Шрифт в оставшихся колонках */
.main-table thead tr :nth-last-child(-n + 3) button {
  color: #757575;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.4px;
}

/* START: размеры колонок  */
.main-table tbody :nth-child(1) {
  width: 10%;
}
.main-table tbody :nth-child(2) {
  width: 50%;
}
.main-table tbody :nth-child(3) {
  width: 20%;
}
.main-table tbody :nth-child(4) {
  width: 20%;
}
/* END: размеры колонок  */

/* END : заголовки таблицы */
</style>