<template>
    <div class="slider" ref="slider">
        <div class="slider_imgs" ref="sliderImg">
            <div v-for="(item,key) in imgList" :key="key" class="slider_item">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl" alt="">
                </a>
            </div>
        </div>
        <div class="points">
            <span class="dot" :class="{current:currentPageIndex == index}" v-for="(item,index) in dots" :key='index'>
            </span>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {getRecommend} from 'api/recommend'
    import {ERR_OK} from 'api/config'

    export default {
        data() {
            return {
                dots:[],
                currentPageIndex:0,
                imgList:[],
            }
        },
        props:{
            loop:{
                type:Boolean,
                default:true
            },
            autoPlay:{
                type:Boolean,
                default:true,
            }
        },
        created(){
            this._getRecommend()
        },
        mounted(){
            window.addEventListener('resize',() => {
                this._setWidth()
                this.slider.refresh()
            })
        },
        methods:{
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code == ERR_OK) {
                        this.imgList = res.data.slider
                        setTimeout(() => {
                            this._setWidth()
                            this._initDots()
                            this._initScroll()
                            if (this.autoPlay) {
                                this._play()
                            }
                        })
                    }
                })
            },
            _setWidth() {
                let width = this.$refs.slider.clientWidth
                this.width = `width:${width}px`
                let dom = this.$refs.sliderImg.children
                Array.prototype.forEach.call(dom,(item) => {
                    item.style.width = `${width}px`
                })
                this.$refs.sliderImg.style.width = this.loop ? width * (this.imgList.length + 2) + 'px' : width * this.imgList.length + 'px'
            },
            _initDots() {
                this.dots = new Array(this.imgList.length)
            },
            _initScroll() {
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap:true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400,
                    
                })
                this.slider.on('scrollEnd',() => {
                    let index = this.slider.getCurrentPage().pageX
                    if (this.loop) {
                        index -= 1
                    }
                    this.currentPageIndex = index
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                        this._play()
                    }
                })
                this.slider.on('beforeScrollStart',() => {
                    clearTimeout(this.timer)
                })
            },
            _play() {
                let index = this.currentPageIndex + 1
                if (this.loop) {
                    index++
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(index,0,400)
                },3000)
            }
        },
    }
</script>
<style>
    .slider{
        width:100%;
        overflow: hidden;
        position: relative;
    }
    .slider_imgs{
        width:100%;
        white-space: nowrap;
        overflow: hidden;
    }
    .slider_item{
        float: left;
    }
    .points{
        position: absolute;
        bottom:10px;
        display: flex;
        justify-content: space-between;
        width: 100px;
        overflow: hidden;
        left:50%;
        margin-left: -50px;
    }
    .dot{
        width: 10px;
        height:10px;
        display: inline-block;
        background: #666666;
        border-radius: 50%;
    }
    .points.current{
        width: 18px;
        border-radius: 10px;
        background: rgb(190, 190, 190);
    }
</style>
