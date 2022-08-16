<template>
  <div class="AppView">
    <NavbarComp/>
    <div class="container pb-5 pt-3">
      <div class="grid w-100">
        <div class="col-xs-12 col-sm-12 col-md-4">
          <RepositoryList/>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComp from '@/components/navigation/NavbarComp.vue';
import RepositoryList from '@/components/repository/RepositoryList.vue';
export default {
  name: 'AppView',
  components: {
    NavbarComp,
    RepositoryList
  }
}
</script>
