<template>
    <img class="arrow" v-show="option" src="../assets/arrow_down.png">
    <img class ="arrow" v-show="!option" src="../assets/arrow_up.png">
</template>
<script>

export default{
    props:{option : { type : Boolean,require : true}}
}
</script>

<style scoped>
.arrow
{
    margin-top:2px;
    width:20px;
    height:20px;
    float: right;
}
</style>
