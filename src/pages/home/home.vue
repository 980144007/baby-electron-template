<script setup>
// const { dialog } = require('electron')

</script>
<script>
export default {
    name: "page-home",
    methods: {
        onClick() {
            // alert("666!")
            
        }
    },
    created() {
        console.log(this.$store)
    }
}
</script>

<template>
    <div class="page-home-container">
        396
        <el-button type="primary" @click="onClick">大哥牛批！666！</el-button>
    </div>
</template>

<style lang="less" scoped>
.page-home-container {
    width: 100%;
    height: 100%;
    background: @background-gray-color;
}    
</style>