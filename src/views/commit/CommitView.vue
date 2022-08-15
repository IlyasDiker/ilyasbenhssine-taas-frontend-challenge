<template>
  <div class="CommitView">
    <h2 class="mb-3">{{$route.params.id}}</h2>
    <div class="flex-row mb-4">
        <select v-model="selectedBranch" class="small">
            <template v-for="(item, index) in branches" :key="index">
                <option :value="item.commit.sha">{{item.name}}</option>
            </template>
        </select>
    </div>
    <ul class="commits-list">
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
            selectedBranch: null,
            branches: [],
            commits: []
        };
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