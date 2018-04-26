<template>
    <transition name="slide">
        <music-list :msg="disc"></music-list>
    </transition>
</template>
<script>
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import { mapGetters } from 'vuex'
import MusicList from './music_list'

export default {
    data() {
        return {

        }
    },
    created() {
        this._getSongList()
    },
    computed:{
        ...mapGetters([
            'disc'
        ])
    },
    methods:{
        _getSongList() {
            if (!this.disc.dissid) {
                this.$router.push({path:'/recommend'})
                return
            }
            console.log(this.disc)
            getSongList(this.disc.dissid).then((res) => {
                if (res.code == ERR_OK) {
                    console.log(res)
                }
            })
        }
    },
    components:{
        MusicList,
    }
}
</script>
<style>
    .slide-enter-active, .slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to{
        transform:translate3d(100%,0,0) 
    }
</style>
