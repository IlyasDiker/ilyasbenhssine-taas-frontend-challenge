<template>
    <div class="repository-list-wrapper">
        <div class="repository-list">
            <div class="repository-list-filter">
                <label class="input-wrapper">
                    <input type="search" placeholder="Search by name ..." class="large" v-model="searchField" ref="searchInput">
                    <div class="suffix">
                        <kbd>Ctrl</kbd>+<kbd>K</kbd>
                    </div>
                </label>
                <select v-model="sortFilter">
                <template v-for="(item, index) in filterOptions" :key="index">
                    <option :value="item.id">{{item.label}}</option>
                </template>
                </select>
            </div>
            <div class="repository-list-repos">
                <ul class="repository-list-repos-wrapper">
                    <template v-if="repositories.length > 0">
                        <template v-for="(repository, index) in getPresentationRepos()" :key="index">
                            <RepositoryItem 
                                :name="repository.full_name"
                                :owner-avatar="repository.owner.avatar_url"/>
                        </template>
                        <template v-if="getPresentationRepos().length == 0">
                            <template v-for="(repository, index) in presentationRepos" :key="index">
                                <RepositoryItem 
                                    :name="repository.full_name"
                                    :owner-avatar="repository.owner.avatar_url"/>
                            </template>
                        </template>
                        <a @click="loadMoreRepos()" v-if="loadMore" role="listitem" class="load-more text-sm">
                            Show more
                        </a>
                    </template>
                    <template v-else>
                        <template v-for="x in Array(5)" :key="x">
                            <RepositorySkeleton/>
                        </template>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useAccountStore } from '@/stores/account';
import RepositoryItem from "./RepositoryItem.vue";
import RepositorySkeleton from './RepositorySkeleton.vue';
import { getRepositories } from '@/data/data';
import { getSearchRepositories } from '../../data/api';
export default {
    watch: {
        sortFilter(){
            this.paginationPage = 1;
            this.repositories = [];
            this.getRepos();
        },
        searchField(to){
            if(to.length > 3 && this.getPresentationRepos().length == 0){
                getSearchRepositories(to, this.accountStore.account.login)
                    .then((data)=>{
                        this.presentationRepos = data.items;
                    }, (err)=>{
                        console.error(err);
                    })
            }
        }
    },
    methods: {
        getRepos(){
            getRepositories(this.paginationPage,this.sortFilter).then((data)=>{
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
            getRepositories((this.paginationPage + 1),this.sortFilter).then((data)=>{
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
            return this.repositories.filter(x => x.name.toLowerCase().includes(this.searchField.toLowerCase()));
        },
        keyDown(e){
            if(e.ctrlKey && e.code == 'KeyK'){
                e.preventDefault();
                this.$refs.searchInput.focus();
            }
        }
    },
    setup () {
        const accountStore = useAccountStore();
        return {accountStore};
    },
    created () {
        this.getRepos();
    },
    mounted(){
        window.addEventListener('keydown', this.keyDown)
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyDown)
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
            repositories: [],
            presentationRepos: []
        };
    },
    components: { RepositoryItem, RepositorySkeleton }
}
</script>

<style lang="scss" scoped>
    .repository-list{
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        max-height: 100%;
        border: 1px solid #20232A;
        border-radius: 10px;
        overflow: hidden;
        *::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
        &-wrapper{
            position: sticky;
            top: 71px;
            max-height: calc(100vh - 71px - 3.5rem);
        }
        &-filter{
            display: flex;
            flex-direction: row;
            gap: 5px;
            padding: 10px;
        }
        &-repos{
            flex-grow: 1;
            overflow: auto;
            max-height: 400px;
            position: relative;
            &-wrapper{
                list-style: none;
                display: flex;
                flex-direction: column;
            }
        }
        .load-more{
            padding: 8px 10px;
            color: white;
            text-align: center;
            &:focus-within, &:hover{
                background: rgba(133, 133, 133, 0.158);
                text-decoration: underline;
            }
        }
    }

    .input-wrapper{
        position: relative;
        flex-grow: 1;
        .suffix{
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            gap: 5px;
            justify-content: center;
            align-items: center;
            padding-right: 10px;
            font-size: 12px;
            color: #d4d4d8;
        }
    }
</style>