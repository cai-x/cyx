// 发送请求
import http from './http';
import { nowPlayingListUrl, comingSoonListUrl, detailUrl, cityUrl } from '@/config/url';

// 获取正在热映列表分页数据
export const nowPlayingListData = (pageNum = 1) => {
    http.defaults.headers.info = ""
    return http.get(nowPlayingListUrl + pageNum);
};
export const comingSoonListData = (pageNum = 1) => {
    http.defaults.headers.info = ""
    return http.get(comingSoonListUrl + pageNum);
};
export const detailData = (filmId) => {
    http.defaults.headers.info = "info";
    return http.get(detailUrl + filmId);
};
export const cityData = async() => {
    http.defaults.headers.info = "city";
    let ret = await http.get(cityUrl);
    let cities = ret.data.data.cities;
    let codeList = []; //完整26个字母
    let dataList = []; //城市信息
    let indexList = []; //经过筛选字母信息
    // 循环生成26个字母
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i));
    }
    // 开始处理
    codeList.forEach((e) => {
        let tempArr = cities.filter((item) => e.toLowerCase() == item.pinyin.substr(0, 1));
        if (tempArr.length > 0) {
            indexList.push(e);
            dataList.push({
                index: e,
                data: tempArr
            });
        }
    })
    return Promise.resolve([indexList, dataList])
};