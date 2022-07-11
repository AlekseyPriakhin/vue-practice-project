<template>
  <tbody>
    <tr 
      v-for="(record, i) in records" 
      :key="record.id"
      :class="i % 2 === 0 ? style['even-row'] : style['odd-row']"
    >
      <td>{{ record.id }}</td>
      <td>{{ record.name }}</td>
      <td>{{ record.short_name }}</td>
      <td>{{ record.code }}</td>
    </tr>
  </tbody>
</template>


<script setup>
import {defineProps, toRef, useCssModule} from 'vue'

const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
    records : Array,
});

const style = useCssModule();

const records = toRef(props,'records');

</script>


<style module>

:root
{
  --table-even-row-bg-color:#f8f8f8;
  --table-odd-row-bg-color:#ffffff;
}

.odd-row{
    background: var(--table-odd-row-bg-color);
}

.even-row{
    background: var(--table-even-row-bg-color);
}

.even-row:hover td, .odd-row:hover td {
  background-color: var(--bg-active-color);
  color: var(--font-hover-active-color);
}

</style>
