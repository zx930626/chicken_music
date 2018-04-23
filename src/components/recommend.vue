<template>
    <div class="recommend">
        <scroll>
            <div class="slider">
                <slider :sliderImg="imgList">
                </slider>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from '../base/scroll'
import Slider from 'base/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'


export default {
    data(){
        return {
            imgList:[]
        }
    },
    created(){
        this._getRecommend()
    },
    computed:{
        
    },
    methods:{
        _getRecommend() {
            getRecommend().then((res) => {
                if(res.code == ERR_OK) {
                    this.imgList = res.data.slider
                }
            })
        }
    },
    components:{
        Scroll,
        Slider,
    }
}
</script>
<style>
    .slider{
        width: 100%;
    }
    
</style>
