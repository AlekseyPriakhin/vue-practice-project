<template>
  <div class="wrapper">
    <table-component />
  </div>
</template>

<script>
import TableComponent from "../components/TableComponent.vue";
//import debounce from "lodash.debounce";
export default {
  components: {
    TableComponent,
  },
};
</script>

<style>
.wrapper {
  position: absolute;
  margin: 135px 40px;
}
</style>

