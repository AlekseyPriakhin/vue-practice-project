<template>
  <div :class="style['wrapper']">
    <SearchField @search-request="search" />
    <table :class="style['main-table']">
      <thead>
        <tr>
          <td 
            v-for="header in tableHeaders" 
            :key="header.id"
            :style="{width: header.widthInPercents + '%'}"
          >
            <Button 
              :name="header.name"
              :class="style['sort-button']"
              @button-click="onSort(header)"
            />
            <TableSortArrows :option="header.isDesc" />
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
    <Pagination
      :total-pages="totalPages"
      :cp="currentPage"
      @to-page="setRecords"
    />
  </div>
</template>


<script setup>

import { ref, onMounted, useCssModule } from "vue";
import { getRecords } from "../services/CarTypesService.js";

import Pagination from "./TablePagination.vue";
import TableSortArrows from "./TableSortArrows.vue";
import Button from "./ButtonComponent.vue";
import SearchField from './SearchField.vue'

const style = useCssModule();

let searchQueryString = "";
const per_page = 10;
const sortOptions = [];

const tableRecords = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);
const tableHeaders = ref(
  [
    { id: "id", name: "id", priority: 1, isDesc : false, widthInPercents : 10 },
    { id: "name", name: "Полное название", priority: 2, isDesc : false, widthInPercents : 50 },
    { id: "short_name", name: "Короткое название", priority: 3, isDesc : false, widthInPercents : 20 },
    { id: "code", name: "Код вагона", priority: 4, isDesc : false, widthInPercents : 20 },
  ]
)

onMounted(async () => setRecords());

const setRecords = async (page) => {
  const result = await getRecords(page, searchQueryString, sortOptions, per_page);
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

  const index = sortOptions.findIndex((option) => option.id === header.id);
  if (index !== -1) sortOptions[index].isDesc = header.isDesc;
  else {
    sortOptions.push(header);
    sortOptions.sort((a, b) => a.priority - b.priority);
  }
  setRecords(currentPage.value);
};

const search = (queryString) =>
{
  searchQueryString = queryString
  setRecords(1);
};

</script>

<style module>

:root
{
  --table-odd-row-bg-color:#f8f8f8;
  --table-even-row-bg-color:#ffffff;
  --table-column-head-font-color: #757575;
  --table-shadow-color: rgba(0, 0, 0, 0.1);
}

.wrapper
{
  padding-top: 127px;
  margin-left: 40px;
}

/* START : тело таблицы */

.main-table {
  padding: 0px;
  margin-bottom: 56.8px;
  width: 1359px;
  height: 568px;
  background: var(--bg-table-even-row-color);
  box-shadow: 0px 0px 30px var(--table-shadow-color);
  border-radius: 4px;
}

.main-table td {
  height: 51.5px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 400;
  color: var(--black-font-color);
  line-height: 20px;
  letter-spacing: 0.25px;
}

.main-table tbody tr:nth-child(odd) {
  background: var(--table-odd-row-bg-color);
}

.main-table tbody tr:hover td {
  background-color: var(--bg-active-color);
  color: var(--font-hover-active-color);
}

/* END : тело таблицы */

/* START : заголовки таблицы */

button.sort-button {
  padding: 0px;
  background-color: var(--bg-color);
  border: none;
}

/* Шрифт в первой колонке */

.main-table thead tr :nth-child(1) button {
  color: var(--black-font-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.4px;
}

/* Шрифт в оставшихся колонках */

.main-table thead tr :nth-last-child(-n + 3) button {
  color: var( --table-column-head-font-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.4px;
}

/* END : заголовки таблицы */

</style>