<template>
    <div class="music_list">
        <div class="tit">
            <div class="back" @click="back">
                <i class="el-icon-arrow-left"></i>
            </div>
            <h4>{{name}}</h4>
        </div>
        <div class="bgImg" :style="bgImg">
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in songList" :key="index">
                    {{item.musicData.songname}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

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
        }
    },
    methods:{
        back() {
            this.$router.back()
        }   
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
    .list li{
        color:#c2c2c2;
        line-height: 50px;
        padding:0 0 0 40px;
    }
</style>
