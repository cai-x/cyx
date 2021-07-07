import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由模块
import CenterRouter from '@/router/routes/center'
import CinemaRouter from '@/router/routes/cinema'
import FilmRouter from '@/router/routes/film'
import DetailRouter from '@/router/routes/detail'
import CityRouter from '@/router/routes/city'

Vue.use(VueRouter)

const routes = [
    CenterRouter,
    CinemaRouter,
    FilmRouter,
    DetailRouter,
    CityRouter,
    {
        path: '/',
        redirect: '/Film'
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router