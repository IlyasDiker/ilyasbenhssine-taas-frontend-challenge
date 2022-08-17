<template>
    <div class="repository-item">
        <div class="repository-item-avatar skeleton" width="20"></div>
        <span class="text-sm repository-item-label skeleton-text">Lorem Ipsum dolores</span>
    </div>
</template>

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
    }
</style>