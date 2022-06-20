<template>
    <img v-if="option" src="@/assets/arrow_down.png">
    <img v-else src="@/assets/arrow_up.png">
</template>
<script>

export default{
    props:{option : { type : Boolean,require : true}}
}
</script>

<style scoped>
img
{
    margin-top:2px;
    width:20px;
    height:20px;
    float: right;
}
</style>
