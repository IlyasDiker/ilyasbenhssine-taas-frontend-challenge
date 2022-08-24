<template>
  <div class="AuthView">
    <template v-if="!accoutStore.account">
      <a :href="authorisation_link" class="button primary xl">Authorize my github account</a>
    </template>
    <img src="@/assets/RasterFloor.webp" role="presentation" class="AuthView_background">
  </div>
</template>

<script>
import { authorizeClient, getAuthLink } from '@/data/auth';
import { getClientUser } from '@/data/data';
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
        if(!tokenData.token){
          this.accoutStore.setToken(null);
          console.error(tokenData.error ?? 'Something went Wrong');
        } else {
          this.accoutStore.setToken(tokenData.token);
          getClientUser().then((accountData)=>{
            if(accountData){
              this.accoutStore.registerAccount(accountData);
              this.$router.push('/app');
            }
          },()=>{});
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
  background: linear-gradient(#1e3b8a3a ,transparent);
  position: relative;
  overflow: hidden;
  &_background{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
    z-index: -1;
    transform: translateY(20%);
    opacity: .5;
  }
}
</style>