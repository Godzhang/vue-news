<template>
  <div id="app">
    <v-header @showSide="show"></v-header>
    <sidebar ref="sidebar"></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from '@/components/v-header/v-header';
import Sidebar from '@/components/sidebar/sidebar';

export default {
  name: 'app',
  methods: {
    show(){
      this.$refs.sidebar.open()
    }
  },
  components: {
    VHeader,
    Sidebar
  }
}
</script>

<style>

</style>
