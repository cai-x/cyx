// 封装axios请求
import axios from 'axios';

axios.defaults.baseURL = "https://m.maizuo.com";
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    let host = '';
    let info = config.headers.info;
    if ("info" == info) {
        host = "mall.film-ticket.film.info";
    } else if ("cinema" == info) {
        host = "mall.film-ticket.cinema.list";
    } else if ("city" == info) {
        host = "mall.film-ticket.city.list";
    } else {
        host = "mall.film-ticket.film.list";
    }
    config.headers = {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"16252959314021678526955521","bc":"440100"}',
        "X-Host": host
    };
    return config;
}, function(error) {});

export default axios;