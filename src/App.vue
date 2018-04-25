<template>
    <div id="app">
        <m-head></m-head>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import Tab from './components/tab.vue'
    import MHead from './components/mHeader.vue'
    export default {
        name: 'App',
        components:{
          Tab,
          MHead
        }
    }
</script>

<style>
    *{
        padding: 0;
        margin:0;
    }
    a{
        text-decoration: none;
    }
    img{
        width: 100%;
    }
    html,body{
        height:100%;
        width: 100%;
        background: #4a4a4a;
        color: white;
    }
    #app{
        width: 100%;
        height:100%;
    }
</style>
