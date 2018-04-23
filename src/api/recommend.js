import jsonp from './axios'
import {options, commonParams} from './config'


export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
    }
    return jsonp(url,data,options)
}