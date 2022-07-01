<template>
  <span 
    v-show="option" 
    class="material-icons"
    :class="style.arrow"
  >
    arrow_downward
  </span>
  <span 
    v-show="!option" 
    class="material-icons"
    :class="style.arrow"
  >
    arrow_upward
  </span>
</template>


<script setup>

import {defineProps,useCssModule} from 'vue'

const style = useCssModule();

defineProps({
    option : { 
    type : Boolean,
    require : true
    }
  }
)

</script>


<style module>

.arrow
{ 
    margin-bottom: 15px;
    font-size: 18px;
    color: var(--black-font-color);
    width:18px;
    height:18px;
    float: right;
}

</style>
