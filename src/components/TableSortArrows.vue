<template>
  <span 
    v-show="option" 
    class="material-icons arrow"
  >
    arrow_downward
  </span>
  <span 
    v-show="!option" 
    class="material-icons arrow"
  >
    arrow_upward
  </span>
</template>
<script>

export default{
    props : { 
    option : { 
    type : Boolean,
    require : true
    }
  }
}
</script>

<style scoped>

.arrow
{
    font-size: 18px;
    margin-bottom: 15px;
    width:18px;
    height:18px;
    float: right;
}

</style>
