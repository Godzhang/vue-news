<template>
  <div id="app">
    <v-header @showSide="show"></v-header>
  </div>
</template>

<script>
import VHeader from '@/components/v-header/v-header';

export default {
  name: 'app',
  methods: {
    show(){
      this.$refs.sidebar.open()
    }
  },
  components: {
    VHeader
  }
}
</script>

<style>

</style>
