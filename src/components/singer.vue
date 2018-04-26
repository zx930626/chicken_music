<template>
    <div class="singer">
        <div class="column_list">
            <ul v-for="(items,index) in singerList" :key='index'>
                <li class="column_tit">{{items.title}}</li>
                <li>
                    <ul>
                        <li class="singer_li" v-for="(item,key) in items.items" :key="key">
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
        <div class="character">
            <ul>
                <li v-for="(item,index) in character" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {ERR_OK} from 'api/config'
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer.js'

export default {
    data() {
        return {
            singerList:[],
            character:[],
        }
    },
    created(){
        this._getSingerList()
    },
    computed:{
        
    },
    methods:{
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
                }
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
        }
    }
}
</script>
<style>
    .singer{
        height:calc(100% - 77px);
        overflow: scroll;
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
</style>
