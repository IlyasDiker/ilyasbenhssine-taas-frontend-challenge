<template>
  <NavbarComp/>
  <router-view />
</template>

<script>
import NavbarComp from '@/components/navigation/NavbarComp.vue';
export default {
    components: { NavbarComp }
};
</script>

<style lang="scss">

</style>
