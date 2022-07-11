<template>
  <thead>
    <tr>
      <td 
        v-for="header in tableHeaders" 
        :key="header.id"
        :class="header.id === 'id' ? style['id-col'] : style['other-col']" 
        :style="{width: header.widthInPercents + '%'}"
      >
        <button 
          :class="style['sort-button']"
          @click.prevent="onSort(header)"
        >
          {{ header.name }}
        </button>
        <TableSortArrows :option="header.isDesc" />
      </td>
    </tr>
  </thead>
</template>


<script setup>

import { defineEmits, ref, useCssModule} from 'vue';

import TableSortArrows from './TableSortArrows.vue'

const emits = defineEmits(["onSort"]);

const style = useCssModule();

const tableHeaders = ref(
  [
    { id: "id", name: "id", priority: 1, isDesc : false, widthInPercents : 10 },
    { id: "name", name: "Полное название", priority: 2, isDesc : false, widthInPercents : 50 },
    { id: "short_name", name: "Короткое название", priority: 3, isDesc : false, widthInPercents : 20 },
    { id: "code", name: "Код вагона", priority: 4, isDesc : false, widthInPercents : 20 },
  ]
)

const onSort = (header) => emits("onSort", header);

</script>


<style module>

:root
{
  --table-column-head-font-color: #757575;
}

button.sort-button {
  padding: 0px;
  background-color: var(--bg-color);
  border: none;
}

.id-col button{
  color: var(--black-font-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.4px;
}

.other-col button{
  color: var( --table-column-head-font-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.4px;
}

</style>