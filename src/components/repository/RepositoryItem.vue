<template>
    <div class="repository-item">
        <img :src="ownerAvatar" class="repository-item-avatar" width="20">
        <span class="text-sm repository-item-label">{{name}}</span>
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
    .repository-item{
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        &-avatar{
            width: 20px;
            height: 20px;
            border-radius: 3px;
            border: 1px solid rgba(128, 128, 128, 0.171);
        }
        
        &:focus-within{
            background: rgba(255, 255, 255, 0.466);
        }
    }
</style>