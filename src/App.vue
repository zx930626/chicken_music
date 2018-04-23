<template>
    <div id="app">
       <tab></tab>
       <keep-alive>
          <router-view></router-view>
       </keep-alive>
    </div>
</template>

<script>
    import Tab from './components/tab.vue'
    export default {
        name: 'App',
        components:{
          Tab,
        }
    }
</script>

<style>

</style>
