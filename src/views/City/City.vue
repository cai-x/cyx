<template>
    <div>
        <van-index-bar :index-list="indexList">
            <template v-for="(item,index) in dataList">
               <van-index-anchor :index="item.index" :key="index" style="background:#eee"/>
               <van-cell @click="chooseCity(sub.name)" v-for="(sub,keys) in item.data" :key="sub.name+keys" :title="sub.name" />
            </template>
        </van-index-bar>
    </div>
</template>

<script>
import { cityData } from '@/api/api';
import Vue from 'vue';
import {IndexBar, IndexAnchor, Cell} from 'vant';
import 'vant/lib/index.css';
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
    data(){
        return{
            dataList: [],//城市信息
            indexList: [],//字母
        }
    },
    created(){
        this.eventBus.$emit("footerNav",false);
    },
    beforeDestroy(){
        this.eventBus.$emit("footerNav",true);
    },
    async mounted() {
        var ret = await cityData();
        this.dataList = ret[1];
        this.indexList = ret[0];
    },
    methods:{
        chooseCity:function(cityName){
            // console.log(cityName);
            this.$state.commit('setCity',cityName);
            this.$router.go(-1);
        }
    }
}
</script>