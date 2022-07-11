<template>
  <div :class="style['wrapper']">
    <SearchField @search-request="search" />
    <table :class="style['main-table']">
      <TableHead @on-sort="onSort" />
      <TableBody :records="tableRecords" />
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
import SearchField from './SearchField.vue'
import TableHead from './TableHead.vue'
import TableBody from './TableBody.vue'

const style = useCssModule();

let searchQueryString = "";
const per_page = 10;
const sortOptions = [];

const tableRecords = ref([]);
const totalPages = ref(1);
const currentPage = ref(1);


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

  const index = sortOptions.findIndex((option) => option.id === header.id);
  if (index !== -1) sortOptions[index].isDesc = !sortOptions[index].isDesc;
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
  --table-bg-color:#ffffff;
  --table-shadow-color: rgba(0, 0, 0, 0.1);
}

.wrapper
{
  padding-top: 127px;
  margin-left: 40px;
}

.main-table {
  padding: 0px;
  margin-bottom: 56.8px;
  width: 1359px;
  height: 568px;
  background: var(--table-bg-color);
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


</style>