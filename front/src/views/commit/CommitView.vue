<template>
  <div class="CommitView">
    <h2 class="text-3xl mb-4 fw-600">{{$route.params.id}}</h2>
    <div class="flex-row mb-3">
            <select v-model="selectedBranch">
                <template v-for="(item, index) in branches" :key="index">
                    <option :value="item.commit.sha">{{item.name}}</option>
                </template>
            </select>
    </div>
    <ul class="commits-list" id="commitsList">
        <template v-if="commits.length > 0">
            <template v-for="(item, index) in commits" :key="index">
                <li>
                    <CommitItem :commit="item"/>
                </li>
            </template>
        </template>
        <template v-else>
            <template v-for="x in Array(4)" :key="x">
                <li>
                    <CommitSkeleton/>
                </li>
            </template>
        </template>
    </ul>
  </div>
</template>

<script>
import { getBranches, getCommits } from '@/data/api';
import { useAccountStore } from '@/stores/account';
import CommitItem from '@/components/commit/CommitItem.vue';
import CommitSkeleton from '@/components/commit/CommitSkeleton.vue';

export default {
    methods: {
        LoadCommits() {
            this.isLoading = true;
            this.commits = [];
            if (this.$route.params.id) {
                getCommits(this.accountStore.token, this.$route.params.id, this.paginationCount)
                    .then((data) => {
                    if (data && data.length > 0) {
                        this.selectedBranch = data[0].sha;
                        data.forEach((commit) => {
                            this.commits.push(commit);
                        });
                    }
                    if(data.length < 30){
                        this.paginationEnd = true;
                    }
                    this.isLoading = false;
                }, (err) => {
                    console.log(err);
                });
                getBranches(this.accountStore.token, this.$route.params.id)
                    .then((data) => {
                    this.branches = []
                    if (data && data.length > 0) {
                        data.forEach((commit) => {
                            this.branches.push(commit);
                        });
                    }
                }, (err) => {
                    console.log(err);
                });
            }
        },
        loadMore(){
            if(!this.isLoading && !this.paginationEnd){
                console.log('call more');
                this.isLoading = true;
                this.paginationCount++;
                getCommits(this.accountStore.token, this.$route.params.id, this.paginationCount, this.selectedBranch)
                    .then((data) => {
                        if (data && data.length > 0) {
                            data.forEach((commit) => {
                                data.reverse();
                                this.commits.push(commit);
                            });
                        }
                        if(data.length < 30){
                            this.paginationEnd = true;
                        }
                        this.isLoading = false;
                    }, (err) => {
                        console.error(err);
                        this.isLoading = false;
                    });
            }
        },
        handleScroll(){
            let commitListBoundingBox = document.querySelector('#commitsList').getBoundingClientRect();
            if(commitListBoundingBox){
                if(commitListBoundingBox.bottom < window.innerHeight){
                    this.loadMore();
                }
            }
        }
    },
    watch: {
        id() {
            this.commits = null;
            this.branches = null;
            this.LoadCommits();
        },
        selectedBranch(to, from) {
            if(from && to){
                getCommits(this.accountStore.token, this.$route.params.id, this.paginationCount, to)
                    .then((data) => {
                        this.commits = [];
                        if (data && data.length > 0) {
                            data.forEach((commit) => {
                                data.reverse();
                                this.commits.push(commit);
                            });
                        }
                        if(data.length < 30){
                            this.paginationEnd = true;
                        }
                        this.isLoading = false;
                    }, (err) => {
                        console.error(err);
                        this.isLoading = false;
                    });
            }
        }
    },
    props: {
        id: String
    },
    setup() {
        const accountStore = useAccountStore();
        return { accountStore };
    },
    data() {
        return {
            paginationCount: 1,
            paginationEnd: false,
            selectedBranch: null,
            isLoading: false,
            branches: null,
            commits: null
        };
    },
    mounted(){
        window.addEventListener("scroll", this.handleScroll)
    }, 
    unmounted(){
        window.removeEventListener("scroll", this.handleScroll)
    },
    created() {
        this.LoadCommits();
    },
    components: { CommitItem, CommitSkeleton }
}
</script>

<style lang="scss" scoped>
    .CommitView{
        display: flex;
        flex-direction: column;
    }

    .commits-list{
        display: flex;
        flex-direction: column;
        list-style: none;
        gap: 10px;
    }
</style>