<template>
    <transition name="slide">
        <music-list :msg="songObj"></music-list>
    </transition>
</template>
<script>
import MusicList from './music_list'
import {getSingerDetail} from 'api/singer'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'

export default {
    data() {
        return {
            songObj:{}
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getSongList()
    },
    methods:{
        _getSongList() {
            getSingerDetail(this.singer.id).then(res => {
                if (res.code == ERR_OK) {
                    this.singer.list = res.data.list
                    console.log(this.singer)
                }
            })
        }
    },
    components:{
        MusicList
    }
}
</script>
<style>
    .slide-enter-active,.slide-leave-active{
        transition:all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0)
    }
</style>
