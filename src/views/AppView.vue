<template>
  <div class="AppView">
    <NavbarComp/>
    <div class="container pb-5 pt-3">
      <span>App</span>
    </div>
  </div>
</template>

<script>
import NavbarComp from '@/components/navigation/NavbarComp.vue';
export default {
  name: 'AppView',
  components: {
    NavbarComp
}
}
</script>
