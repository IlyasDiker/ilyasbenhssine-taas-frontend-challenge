<template>
    <div class="repository-list-wrapper">
        <div class="repository-list">
            <div class="repository-list-filter">
                <input type="search" placeholder="Search by name ..." class="large" v-model="searchField">
                <select v-model="sortFilter">
                <template v-for="(item, index) in filterOptions" :key="index">
                    <option :value="item.id">{{item.label}}</option>
                </template>
                </select>
            </div>
            <div class="repository-list-repos py-2">
                <ul class="repository-list-repos-wrapper">
                    <template v-for="(repository, index) in getPresentationRepos()" :key="index">
                        <router-link role="listitem" :to="`/app/commit/${repository.full_name}`">
                            <RepositoryItem 
                                :name="repository.full_name"
                                :owner-avatar="repository.owner.avatar_url"/>
                        </router-link>
                    </template>
                    <li v-if="loadMore">
                        <a class="link" @click="loadMoreRepos()">
                            Load more
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import RepositoryItem from "./RepositoryItem.vue";
import { getRepositories } from '@/data/api';
export default {
    watch: {
        sortFilter(){
            this.paginationPage = 1;
            this.repositories = [];
            this.getRepos();
        }
    },
    methods: {
        getRepos(){
            getRepositories(this.accountStore.token, this.paginationPage,this.sortFilter).then((data)=>{
                data.forEach((elem)=>{
                    this.repositories.push(elem)
                }) 
                if(data.length < 30) {
                    this.loadMore = false;
                }
            }, (err)=>{
                console.log(err);
            })
        },
        loadMoreRepos(){
            getRepositories(this.accountStore.token, (this.paginationPage + 1),this.sortFilter).then((data)=>{
                if(data && data.length > 0){
                    this.paginationPage++;
                    data.forEach((elem)=>{
                        this.repositories.push(elem)
                    }) 
                    if(data.length < 30) {
                        this.loadMore = false;
                    }
                } else {
                    this.loadMore = false;
                }
            }, (err)=>{
                console.log(err);
            })
        },
        getPresentationRepos(){
            return this.repositories.filter(x => x.name.toLowerCase().includes(this.searchField.toLowerCase()))
        }
    },
    setup () {
        const accountStore = useAccountStore();
        return {accountStore};
    },
    created () {
        this.getRepos();
    },
    name: "RepositoryList",
    data() {
        return {
            paginationPage: 1,
            loadMore: true,
            sortFilter: "full_name",
            searchField: "",
            filterOptions: [
                {
                    id: "full_name",
                    label: "Name"
                },
                {
                    id: "created",
                    label: "Created"
                },
                {
                    id: "updated",
                    label: "Updated"
                },
                {
                    id: "pushed",
                    label: "Preated"
                }
            ],
            repositories: []
        };
    },
    components: { RepositoryItem }
}
</script>

<style lang="scss" scoped>
    .repository-list{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        &-wrapper{
            position: sticky;
            top: 71px;
            max-height: calc(100vh - 71px - 3.5rem);
            overflow: auto;
        }
        &-filter{
            display: flex;
            flex-direction: row;
            gap: 5px;
        }
        &-repos{
            flex-grow: 1;
            overflow: auto;
            &-wrapper{
                list-style: none;
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>