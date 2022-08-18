<template>
  <div class="AppView">
    <NavbarComp/>
    <div class="container pb-5 pt-3">
      <div class="grid w-100">
        <div class="col-12" v-if="accountStore.notification">
        <div class="notification-wrapper">
          <span>{{accountStore.notification}}</span>
          <button @click="accountStore.notification = null" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        </div>
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
import { useAccountStore } from '@/stores/account';
export default {  
  setup(){
    const accountStore = useAccountStore();
    return {accountStore};
  },
  name: 'AppView',
  components: {
    NavbarComp,
    RepositoryList
  }
}
</script>

<style lang="scss">
.notification-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #1e40af;
  background: #1e3b8a70;
  border-radius: 10px;
  color: white;
  .close-btn{
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    &:hover{
      background: rgba(255, 255, 255, 0.089);
    }

  }
}
</style>