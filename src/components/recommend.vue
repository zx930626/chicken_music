<template>
    <div class="recommend">
        <scroll :data="recommend_list">
            <div>
                <div class="slider">
                    <slider>
                    </slider>
                </div>
                <div class="recommend_list">
                    <h5>热门歌单推荐</h5>
                    <div class="list">
                        <ul>
                            <li class="rec_Li" @click="selectItem(item)" v-for="(item,index) in recommend_list" :key='index'>
                                <div class="icon">
                                    <img :src="item.imgurl" alt="">
                                </div>
                                <div class="text">
                                    <span>{{item.creator.name}}</span>
                                    <span>{{item.dissname}}</span>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import Scroll from '../base/scroll'
import Slider from 'base/slider'
import {getDiscList,getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'



export default {
    data(){
        return {
            recommend_list:[]
        }
    },
    created(){
        this._getRecList()
    },
    computed:{
        
    },
    methods:{
        
        selectItem(item) {
            this.$router.push({
                path:`/recommend/${item.dissid}`
            })
            this.setDisc(item)
        },
        _getRecList() {
            getDiscList().then((res) => {
                if (res.code == ERR_OK) {
                    this.recommend_list = res.data.list
                }
            })
        },
        ...mapMutations({
            setDisc:'SET_DISC',
        }),
    },
    components:{
        Scroll,
        Slider,
    }
}
</script>
<style>
    .recommend{
        overflow: scroll;
        height:calc(100% - 77px)
    }
    .slider{
        width: 100%;
    }
    h5{
        color: #fff000;
        text-align: center;
        line-height: 40px;
    }
    .rec_Li{
        box-sizing: border-box;
        padding:0 20px 20px 20px;
        overflow: hidden;
    }
    .icon{
        width: 60px;
        height:60px;
        float: left;
    }
    .text{
        height:60px;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start; 
        margin-left:20px;
    }
    li span{
        text-align: left;
        color: white;
        line-height: 20px;
        font-size: 13px;
    }
    li span:last-child{
        color: #a7a7a7;
    }
</style>
