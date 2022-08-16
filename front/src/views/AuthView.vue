<template>
  <div class="AuthView">
    <template v-if="!accoutStore.account">
      <a :href="authorisation_link" class="button primary">Authorize my github account</a>
    </template>
  </div>
</template>

<script>
import { getAuthLink, authorizeClient, getClientUser } from '@/data/api';
import { useAccountStore } from '@/stores/account';
export default {
  setup(){
    const accoutStore = useAccountStore();
    return {accoutStore};
  },
  created () {
    this.authorisation_link = getAuthLink();
    
    if(this.$route.query.code){
      authorizeClient(this.$route.query.code).then((tokenData)=>{
        if(tokenData.access_token){
          this.accoutStore.setToken(tokenData);
          getClientUser(this.accoutStore.token).then((accountData)=>{
            if(accountData){
              this.accoutStore.registerAccount(accountData);
              this.$router.push('/app');
            }
          },()=>{});
        } else {
          this.accoutStore.setToken(null);
          console.error(tokenData.error ?? 'Something went Wrong');
        }
      }, (err)=>{
        console.error(err.message ?? 'Something went Wrong');
      });
    }
  },
  data () {
    return {
      authorisation_link: ''
    }
  },
  name: 'AuthView',
  components: {

  }
}
</script>

<style lang="scss" scoped>
.AuthView{
  height: 100%;
  min-height: 100vh;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>