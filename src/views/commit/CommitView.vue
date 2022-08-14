<template>
  <div class="EmptyVue">
    <h2 class="mb-3">{{$route.params.id}}</h2>
    <ul>
      <template v-for="(item, index) in commits" :key="index">
        <li>
          <CommitItem :commit="item"/>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { getCommits } from '@/data/api';
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
                        data.forEach((commit) => {
                            this.commits.push(commit);
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

</style>