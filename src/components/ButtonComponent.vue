<template>
  <button 
    type="button"
    @click.prevent="buttonClick"
  >
    {{ name }}
  </button>
</template>


<script setup>
import {defineProps,defineEmits,toRef} from 'vue'


const emits =  defineEmits(["buttonClick"]);

const props = defineProps({
    name : { 
    type : String,
    require : true,
    default : ""
    }
  })

const name = toRef(props, "name");

const buttonClick = ()=> {
    emits("buttonClick");
}

</script>