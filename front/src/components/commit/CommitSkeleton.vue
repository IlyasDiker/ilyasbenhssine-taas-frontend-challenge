<template>
    <div class="commit-item">
        <span class="skeleton-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eveniet aliquam eaque deserunt quis vitae voluptates eius ea.</span>
        <div class="commit-item-desc-row">
            <div class="commit-item-avatar skeleton" width="20"></div>
            <span class="skeleton-text">Loren Ipsum</span>
            <span class="text-xs fw-300 op-7 skeleton-text">commited ?? lighyears ago</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .commit-item{
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        gap: 8px;
        border: 1px solid #27272a96;
        background: #18181b4d;
        border-radius: 10px;
        &-avatar{
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
        }
        &-desc-row{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }
    }
</style>