<template>
    <div class="tab">
        <router-link to='/recommend'>
            推荐
        </router-link>
        <router-link to='/rank'>
            排行
        </router-link>
        <router-link to='/singer'>
            歌手
        </router-link>
        <router-link to='/search'>
            搜索
        </router-link>
    </div>
</template>

<script>
export default {
    
}
</script>
<style>
    .tab{
        display: flex;
        justify-content: space-around;
        align-items: center;
        line-height: 30px;
    }
    .tab a{
        color: white;
        cursor: pointer;
    }
</style>
