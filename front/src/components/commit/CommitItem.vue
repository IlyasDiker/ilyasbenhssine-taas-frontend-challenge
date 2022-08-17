<template>
    <div class="commit-item" role="listitem">
        <span>{{commit.commit.message}}</span>
        <div class="commit-item-desc-row">
            <template v-if="commit.author">
                <img :src="commit.author.avatar_url" class="commit-item-avatar" width="20">
                <span>{{commit.author.login}}</span>
            </template>
            <span class="text-xs fw-300 op-7" :title="formatDateTime(commit.commit.committer.date)">commited {{formatDate(commit.commit.committer.date)}} ago</span>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    methods: {
        formatDate(date){
            return moment(date).fromNow(true);
        },
        formatDateTime(date){
            return moment(date).format('MMMM Do YYYY, h:mm a');
        }
    },
   props:{
    commit: Object
   }
}
</script>

<style lang="scss" scoped>
    .commit-item{
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        gap: 8px;

        background: #18181b;
        border-bottom: 1px solid #27272a;
        &:last-child{
            border: none;
        }
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