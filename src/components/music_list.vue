<template>
    <div class="music_list">
        <div class="tit">
            <div class="back" @click="back">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h4>{{name}}</h4>
        </div>
            <div class="random_play">
                <i class="el-icon-caret-right"></i>
                <span>随机播放列表</span>
            </div>
        <div ref="bgImg" class="bgImg" :style="bgImg">
        </div>
        <scroll :data="songList" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="song_list" ref="songList">
            <div>
                <ul>
                    <li @click="selectItem(item)" v-for="(item,index) in songList" :key="index">
                        <p class="song_name">{{item.musicData.songname}}</p>
                        <span class="singer_album" v-if="item.musicData">{{getDesc(item.musicData)}}</span>
                    </li>
                </ul>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'base/scroll'

export default {
    data() {
        return {
            listenScroll:true,
            probeType:3,
            scrollY:0,
        }
    },
    props:{
        avatar:{
            type:String,
            default:''
        },
        songList:{
            type:Array,
            default:null
        },
        name:{
            type:String,
            default:'',
        }
    },
    computed:{
        bgImg() {
            return `background-image:url(${this.avatar})`
        },
    },
    mounted() {
        this.imgHeight = this.$refs.bgImg.clientHeight
    },
    methods:{
        selectItem(item) {

        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        back() {
            this.$router.back()
        },
        getDesc(song) {
            let singer = song.singer.map(item => {
                return item.name
            }).join('/')
            return `${singer}·${song.albumname}`
        }   
    },
    watch:{
        scrollY(newV) {
            
        }
    },
    components:{
        Scroll,
    }
}
</script>
<style>
    .music_list{
        position: fixed;
        left:0;
        top:0;
        z-index: 10;
        width: 100%;
        height:100%;
        background:#4a4a4a;
    }
    .bgImg{
        height:260px;
        background-size: 100%;
    }
    .back{
        position: absolute;
        top:0;
        left:20px;
        line-height: 40px;
        width: 40px;
        height:40px;
        color:#fff000;
        font-weight: bold;
    }
    .tit{
        position: absolute;
        top: 0;
        width: 100%;
    }
    h4{
        text-align: center;
        color: white;
        line-height: 40px;
    }
    .song_list{
        height: calc(100% - 260px);
        overflow: hidden;
    }
    .song_list ul{
        height:100%;
        overflow: scroll;
    }
    .song_list li{
        color:#c2c2c2;
        padding:0 0 20px 40px;
    }
    .song_list li:first-child{
        padding-top:20px;
    }
    .song_name{
        font-size: 16px;
        line-height: 25px;
        color: white;
    }
    .singer_album{
        font-size: 13px;
    }
    .random_play{
        color: #ffcd32;
        border: 1px solid #ffcd32;
        /* border-radius:50%; */
        font-size:13px;
        position: absolute;
        top:230px;
        transform: translate(-50%);
        left:50%;
        padding:2px 12px;
        border-radius: 12px;
    }
    .random_play i{
        display:inline-block;
        width: 15px;
        height:15px;
        text-align: center;
        line-height: 15px;
        border: 1px solid #ffcd32;
        border-radius:50%;
    }
</style>
