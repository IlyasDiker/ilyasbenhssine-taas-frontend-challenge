<template>
    <div>
        <img :src="ownerAvatar" alt="" width="20">
        <span>{{name}}</span>
    </div>
</template>

<script>
export default {
    props:{
        name: String,
        ownerAvatar: String,
    }
}
</script>

<style lang="scss" scoped>
    
</style>