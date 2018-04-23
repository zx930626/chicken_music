<template>
    <div class="slider" ref="slider">
        <div class="slider_imgs" ref="sliderImg">
            <slot></slot>
        </div>
        <div class="points">
            <span class="dot" :class="{current:currentPageIndex == index}" v-for="(item,index) in dots" :key='index'>
            </span>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                dots:[],
                currentPageIndex:0,
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
        mounted(){
            setTimeout(()=>{
                this._setWidth()
                this._initDots()
                this._initScroll()
                if (this.autoPlay) {
                    this._play()
                }
            },120)

            window.addEventListener('resize',() => {
                this._setWidth()
                this.slider.refresh()
            })
        },
        methods:{
            _setWidth() {
                let dom = this.$refs.sliderImg.children
                let width = this.$refs.slider.clientWidth
                for (let i = 0;i < dom.length;i++) {
                    dom[i].style.width = width + 'px'
                    dom[i].className = 'slider_item'
                }
                
                this.$refs.sliderImg.style.width = this.loop ? width * (dom.length + 2) + 'px' : width * dom.length + 'px'
                
            },
            _initDots() {
                this.dots = new Array(this.$refs.sliderImg.children.length)
            },
            _initScroll() {
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap:{
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400,
                    }
                })

                this.slider.on('scrollEnd',() => {
                    let index = this.slider.getCurrentPage().pageX
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
                let index = this.currentPageIndex
                if (this.loop) {
                    index++
                }
                this.timer = setTimeout(() => {
                    console.log(index)
                    this.slider.goToPage(index,0,400)
                },1000)
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
    .current{
        width: 18px;
        border-radius: 10px;
        background: rgb(190, 190, 190);
    }
</style>
