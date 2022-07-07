<template>
  <div>
    <input
      v-model="searchQueryString"
      type="text"
      :class="style['input-search']"
      aria-describedby="searchHelp"
      placeholder="Что вы ищете?"
    >
    <p 
      class="material-icons" 
      :class="style['search']"
    >
      search
    </p>
    <hr :class="style['divider']">
    <p :class="style['search-input-help']">
      Поиск можно осуществлять по id, названию, короткому названию и коду вагона
    </p>
  </div>
</template>


<script setup>
import {watch, ref, defineEmits, useCssModule } from "vue";
import debounce from "lodash.debounce";

const emits = defineEmits(["searchRequest"]);

const style = useCssModule();

const searchQueryString = ref("");

const search = () => emits('searchRequest',searchQueryString.value);

const debouncedSearch = debounce(search, 750);

watch(searchQueryString, (value) => {
  if (value.length > 3 || value.length === 0) {
    searchQueryString.value = value;
    debouncedSearch();
  }
});

</script>


<style module>

:root
{
    --table-input-help-color:rgba(0, 0, 0, 0.4);
}

.input-search {
  margin-bottom: 8px;
  width: 1319px;
  height: 24px;
  outline: none;
  border-width: 0px;
}

.input-search::placeholder {
  color: var(--black-font-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;                        
  letter-spacing: 0.5px;
}

.search-input-help {
  margin-bottom: 40px;
  font-size: 12px;
  font-style: normal;
  color: var(--table-input-help-color);
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.4px;
}

.search {
  position: absolute;
  margin-bottom: 9px;
  color: var(--red-color);
  font-size: 32px;
}

.divider {
  margin: 0px;
  margin-bottom: 1px;
  width: 1319px;
}

</style>
