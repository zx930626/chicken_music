<template>
    <div class="rank">
        <scroll>
            <div>
                <ul>
                    <li class="rank_list_li" v-for="(items,index) in topList" :key="index">
                        <img :src="items.picUrl" alt="" width="100" height="100">
                        <ul>
                            <li v-for="(item,key) in items.songList" :key="key">
                                <span>{{key + 1}} {{item.songname}}-{{item.singername}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>
<script>
import {getRank} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll'

export default {
    data(){
        return {
            topList:[],
        }
    },
    created() {
        this._getRank()
    },
    methods:{
        _getRank() {
            getRank().then(res => {
                if (res.code == ERR_OK) {
                    this.topList = res.data.topList
                    console.log(res.data)
                }
            })
        }
    },
    components:{
        Scroll,
    }
}
</script>
<style>
    .rank_list_li{
        overflow: hidden;
        padding:0 0 20px 20px;
        box-sizing: border-box;
    }
    .rank_list_li:first-child{
        padding-top:20px;
    }
    .rank_list_li ul{
        width: calc(100% - 120px);
        float: left;
        height:100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        padding:0 20px;
        box-sizing: border-box;
        font-size: 13px;
        color:#9f9f9f;
        overflow: hidden;
        background: #666666;
    }
    .rank_list_li ul li{
        width: 100%;
        overflow: hidden;
    }
    .rank_list_li ul li span{
        width: 100%;
        display:block;
    }
    .rank img{
        width: 100px;
        float: left;
    }
</style>
