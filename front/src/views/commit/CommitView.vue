<template>
  <div class="CommitView">
    <h2 class="text-3xl mb-4">{{$route.params.id}}</h2>
    <div class="flex-row mb-3">
        <select v-model="selectedBranch" class="small">
            <template v-for="(item, index) in branches" :key="index">
                <option :value="item.commit.sha">{{item.name}}</option>
            </template>
        </select>
    </div>
    <ul class="commits-list" id="commitsList">
      <template v-for="(item, index) in commits" :key="index">
        <li>
          <CommitItem :commit="item"/>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { getBranches, getCommits } from '@/data/api';
import { useAccountStore } from '@/stores/account';
import CommitItem from '@/components/commit/CommitItem.vue';

export default {
    methods: {
        LoadCommits() {
            this.isLoading = true;
            this.commits = [];
            if (this.$route.params.id) {
                getCommits(this.accountStore.token, this.$route.params.id, this.paginationCount)
                    .then((data) => {
                    console.log(data);
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
                    console.log(data);
                    if (data && data.length > 0) {
                        data.reverse();
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
            console.log(this.isLoading , this.paginationEnd);
            if(!this.isLoading && !this.paginationEnd){
                this.isLoading = true;
                this.paginationCount++;
                getCommits(this.accountStore.token, this.$route.params.id, this.paginationCount)
                    .then((data) => {
                        console.log(data);
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
                        console.log(err);
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
            this.LoadCommits();
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
            branches: [],
            commits: []
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
    components: { CommitItem }
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