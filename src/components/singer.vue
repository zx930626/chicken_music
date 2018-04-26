<template>
    <div class="singer">
        <scroll @scroll="scroll"
                :listen-scroll="listenScroll"
                :probe-type="probeType"
                :data="singerList"
                class="list_view"
                ref="listView">
            <div class="column_list">
                <ul v-for="(items,index) in singerList" :key='index' ref="list_group">
                    <li class="column_tit">{{items.title}}</li>
                    <li>
                        <ul>
                            <li @click="selectItem(item)" class="singer_li" v-for="(item,key) in items.items" :key="key">
                                <div class="avatar">
                                    <img width="50" height="50" :src="item.avatar" alt="">
                                </div>
                                <span>
                                    {{item.name}}
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="character" v-if="character.length">
                <ul>
                    <li @touchstart="cutTouchStart" @touchmove="cutTouchMove" @touchend="cutTouchEnd" :class="{current:index == currentIndex}" v-for="(item,index) in character" :key="index" :data-key="index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <div class="top_tit" v-if="topListText" ref="topText">
                <span>
                    {{topListText}}
                </span>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
import {ERR_OK} from 'api/config'
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer.js'
import Scroll from 'base/scroll'
import {mapMutations} from 'vuex'

export default {
    data() {
        return {
            singerList:[],
            character:[],
            probeType:3,
            listenScroll:true,
            scrollY:0,
            currentIndex:0,
            diff:-1,
            touch:{}
        }
    },
    created(){
        this._getSingerList()
        
    },
    mounted() {
        
        
    },
    computed:{
        topListText() {
            if (this.scrollY > 0) {
                return ''
            } 
            return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : ''
        }
    },
    methods:{
        selectItem(item) {
            this.$router.push({
                path:`/singer/${item.id}`
            })
            this.setSinger(item)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        cutTouchStart() {
            let index = event.target.getAttribute('data-key')
            this.touch.y1 = event.touches[0].pageY
            this.touch.index = index
            this._scrollTo(index)
        },
        cutTouchMove() {
            this.touch.y2 = event.touches[0].pageY
            let delta = (this.touch.y2 - this.touch.y1) / 17 | 0
            let index = parseInt(this.touch.index) + parseInt(delta)
            this._scrollTo(index)
        },
        cutTouchEnd() {
            
        },
        _scrollTo(index) {
            if (!index && index != 0) {
                return
            }
            if (index < 0) {
                index = 0
            }
            this.currentIndex = index
            this.$refs.listView.scrollToElement(this.$refs.list_group[index],0)
        },
        _getSingerList() {
            getSingerList().then(res => {
                if (res.code == ERR_OK) {
                    this.singerList = this._handleList(res.data.list)
                    this.character = this.singerList.map(item => {
                        if (item.title == '热门') {
                            return '#'
                        }
                        return item.title
                    })
                    setTimeout(() => {
                        this._calculateHeight()
                    },20)
                }
            })
        },
        _calculateHeight() {
            this.listHeight = []
            this.$refs.list_group.forEach(item => {
                this.listHeight.push(item.offsetTop)
            })
        },
        _handleList(list) {
            const column = {
                hot:{
                    title:'热门',
                    items:[],
                }
            }
            list.forEach((item,index) => {
                if (index < 10) {
                    column.hot.items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                }
                const key = item.Findex
                if (!column[key]) {
                    column[key] = {
                        title:key,
                        items:[]
                    }
                }
                column[key].items.push(new Singer({
                    id:item.Fsinger_mid,
                    name:item.Fsinger_name,
                }))
            })
            let arr = []
            let hot = []
            for (let key in column) {
                let val = column[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    arr.push(val)
                }else if(val.title == '热门'){
                    hot.push(val)
                }
            }
            arr.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(arr)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
    },
    watch:{
        scrollY(newV) {
            if (newV > 0) {
                this.currentIndex = 0 
                return
            }
            for (let i = 0;i < this.listHeight.length - 1;i++) {
                const height1 = this.listHeight[i]
                const height2 = this.listHeight[i+1]
                if (-newV > height1 && -newV < height2) {
                    this.currentIndex = i
                    this.diff = newV + height2
                }
            }
            if (-newV > this.listHeight[this.listHeight.length-1]) {
                this.currentIndex = this.listHeight.length-1
                this.diff = newV
            }
        },
        diff(newV) {
            if (!this.$refs.topText) {
                return 
            }
            let top = newV < 28 && newV > 0 ? newV - 28 : 0
            this.$refs.topText.style.transform = `translate3d(0,${top}px,0)`
        },
        
    },
    components:{
        Scroll,
    }
}
</script>
<style>
    .singer{
        height:calc(100% - 77px);
        overflow: scroll;
    }
    /* .singer::-webkit-scrollbar {
        display: none;
    } */
    .list_view{
        height:100%;
        position: relative;
    }
    .column_tit{
        background: #666666;
        font-size: 13px;
        line-height: 28px;
        padding-left: 30px;
    }
    .singer_li{
        padding:10px 30px 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .singer_li .avatar img{
        width: 50px;
        border-radius: 50%;
        margin-right: 20px;
    }
    .character{
        position: fixed;
        width: 20px;
        right: 0;
        top:50%;
        margin-top:-185px;
        background: #666666;
        box-sizing: border-box;
        padding:8px 0;
        border-radius:10px 0 0 10px;
    }
    .character ul li{
        list-style: none;
        font-size: 12px;
        text-align: center;
    }
    .character ul li.current{
        font-size: 16px;
        color:#fff000;
    }
    .top_tit{
        width: 100%;
        position: absolute;
        top:0;
        font-size: 13px;
        background: #666666;
        font-size: 13px;
        line-height: 28px;
        padding-left: 30px;
    }
</style>
