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
            <template v-for="(item, index) in getPresentationCommits()" :key="index">
                <li class="commits-list-item-wrapper">
                    <div class="commits-list-item-head mb-3">
                        <svg aria-hidden="true" height="16" fill="currentColor" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon-git-commit">
                            <path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"></path>
                        </svg>
                        <span class="text-sm fw-300 op-7">Commits on {{moment(index).format('MMM D, YYYY')}}</span>
                    </div>
                    <ul class="commits-box">
                        <template v-for="(itemRow, indexRow) in item" :key="indexRow">
                            <CommitItem :commit="itemRow"/>
                        </template>
                    </ul>
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
import CommitItem from '@/components/commit/CommitItem.vue';
import CommitSkeleton from '@/components/commit/CommitSkeleton.vue';
import moment from 'moment';

export default {
    methods: {
        getPresentationCommits(){
            let data = {};
            this.commits.forEach(el => {
                if(data[moment(el.commit.committer.date).format('L')]){
                    data[moment(el.commit.committer.date).format('L')].push(el);
                }else {
                    data[moment(el.commit.committer.date).format('L')]=[el];
                }
            })
            return data;
        },
        LoadCommits() {
            this.isLoading = true;
            this.commits = [];
            if (!this.$route.params.id) return;
            getCommits(this.$route.params.id, this.paginationCount)
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
            getBranches(this.$route.params.id)
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
        },
        loadMore(){
            if(!this.isLoading && !this.paginationEnd){
                this.isLoading = true;
                this.paginationCount++;
                getCommits(this.$route.params.id, this.paginationCount, this.selectedBranch)
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
            if(!commitListBoundingBox) return;
            if(commitListBoundingBox.bottom < window.innerHeight){
                this.loadMore();
            }
        }
    },
    watch: {
        id() {
            this.commits = null;
            this.branches = null;
            this.paginationCount= 1;
            this.paginationEnd= false;
            this.selectedBranch= null;
            this.isLoading= false;
            this.LoadCommits();
        },
        selectedBranch(to, from) {
            if(from && to){
                getCommits(this.$route.params.id, this.paginationCount, to)
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
                    }, (err) => {
                        console.error(err);
                    });
            }
        }
    },
    props: {
        id: String
    },
    setup() {
        return { moment };
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

    $octoicon--size: 16px;
    $commits-list-head--gap: 20px;
    $commits-list-item-wrapper--padding: 10px;

    .commits-list{
        display: flex;
        flex-direction: column;
        list-style: none;

        &-item-wrapper{
            display: flex;
            flex-direction: column;
            padding: $commits-list-item-wrapper--padding;
            position: relative;
            isolation: isolate;
            .octicon-git-commit{
                width: 16px;
                z-index: 1;
                height: 16px;
                background: var(--background);
            }
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: $commits-list-item-wrapper--padding + ($octoicon--size / 2);
                bottom: 0;
                height: 100%;
                background: #27272a;
                width: 3px;
                z-index: 0;
                transform: translateX(-50%);
            }
        }
        &-item-head{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
        }
    }
    .commits-box{
        border: 1px solid #27272a;
        border-radius: 10px;
        overflow: hidden;
        transition: 0.2s ease-in-out;
        margin-left: $octoicon--size + $commits-list-head--gap;
        z-index: 2;
        @media (max-width: 600px) {
            margin-left: $commits-list-item-wrapper--padding * -1;
        }
    }
</style>