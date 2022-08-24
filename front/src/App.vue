<template>
  <router-view />
</template>

<script>
import { useAccountStore } from '@/stores/account';
import { getClientUser } from './data/data';
export default {
  setup(){
    const accoutStore = useAccountStore();
    return {accoutStore};
  },
  created () {
    if(this.accoutStore.hasToken()){
      getClientUser().then((accountData)=>{
        if(accountData && !accountData.error){
          this.accoutStore.registerAccount(accountData);
          this.accoutStore.notification = "You Github account was successfully authorized"
          this.$router.push('/app');
          
        }
      },()=>{});
    }
  },
  components: { 

  }
};
</script>

<style lang="scss">
  @import '@/styles/styles.scss';
</style>
