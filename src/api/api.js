// 发送请求
import http from './http';
import { nowPlayingListUrl, comingSoonListUrl, detailUrl } from '@/config/url';

// 获取正在热映列表分页数据
export const nowPlayingListData = (pageNum = 1) => {
    http.defaults.headers.info = ""
    return http.get(nowPlayingListUrl + pageNum);
};
export const comingSoonListData = (pageNum = 1) => {
    return http.get(comingSoonListUrl + pageNum);
};
export const detailData = (filmId) => {
    http.defaults.headers.info = "info";
    return http.get(detailUrl + filmId);
};