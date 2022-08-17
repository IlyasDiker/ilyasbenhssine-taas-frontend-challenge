<template>
    <router-link 
        :to="`/app/commit/${name}`" 
        role="listitem" 
        class="repository-item">
        <img :src="ownerAvatar" class="repository-item-avatar" width="20">
        <span class="text-sm repository-item-label">{{name}}</span>
    </router-link>
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
    .repository-item{
        padding: 8px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        outline: none;
        &-avatar{
            width: 20px;
            height: 20px;
            border-radius: 3px;
            border: 1px solid rgba(128, 128, 128, 0.171);
        }
        
        &:focus-within, &:hover{
            background: rgba(133, 133, 133, 0.158);
        }
    }
</style>