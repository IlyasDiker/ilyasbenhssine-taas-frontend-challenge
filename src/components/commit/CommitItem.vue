<template>
    <div>
        <span>{{commit.commit.message}}</span>
        <div class="flex-row gap-10">
            <img :src="commit.author.avatar_url" width="20">
            <span>{{commit.author.login}}</span>
            <span class="text-xs fw-300 op-7">commited {{formatDate(commit.commit.committer.date)}} ago</span>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    methods: {
        formatDate(date){
            return moment(date).fromNow(true);
        }
    },
   props:{
    commit: Object
   }
}
</script>

<style lang="scss" scoped>
    
</style>