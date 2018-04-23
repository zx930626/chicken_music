<template>
    <div class="slider" ref="slider">
        <div class="slider_imgs" ref="sliderImg">
            <div v-for="(item,key) in sliderImg" :key="key">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl" alt="">
                </a>
            </div>
        </div>
        <div class="points">
            <span class="dot" v-for="(item,index) in dots" :key='index'>
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
            sliderImg:{
                type:Array,
                default:[],
            },
            loop:{
                type:Boolean,
                default:true
            }
        },
        mounted(){
            setTimeout(()=>{
                this._setWidth()
                this._initScroll()
                this._play()
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
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400,
                })

                this.slider.on('scrollEnd',() => {
                    let index = this.slider.getCurrentPage().pageX
                    if (this.loop) {
                        index -= 1
                    }
                    this.currentPageIndex = index + 1
                    this._play()
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
    }
    .slider_imgs{
        width:100%;
        white-space: nowrap;
        overflow: hidden;
    }
    .slider_item{
        float: left;
    }
</style>
