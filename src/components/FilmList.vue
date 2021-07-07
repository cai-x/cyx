<template>
<div>
   <Loading v-if="loading"></Loading>

  <div class="scroll" :style="{height:height+'px'}">
    <div class="list">
    <!-- 数据展示 -->
    <div class="item" v-for="(item,index) in newList" :key="index" @click="goDetail(item.filmId)">
        <div class="left">
            <img v-lazy="item.poster"/>
        </div>
        <div class="middle">
            <div>{{item.name}}</div>
            <div v-if="type==1">
                <span>观众评分 </span>
                <span class="grade">{{item.grade}}</span>
            </div>
            <div>主演：{{item.actors | parseActors}}</div>
            <div v-if="type==1">{{ item.nation }} | {{ item.runtime }}分钟</div>
        </div>
        <div class="right">
            <span v-if="type==1">购票</span>
            <span v-else>预购</span>
        </div>
    </div>
    </div>
    </div>


</div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import BScroll from "better-scroll";
import { nowPlayingListData, comingSoonListData } from "@/api/api";
export default {
   components:{Loading},
   props:['lists','type'],
   data() {
       return {
           loading:true,
           height:0,
           bs:null,
           pageNum:1,
           flag:true,//控制是否加载更多
           newList:[]//拼数据
       }
   },
    mounted() {
        // 获取可视高度
        this.height = document.documentElement.clientHeight - 100

    },
      beforeDestroy() {
    // 节约资源
    this.bs = null;
  },
   //页面挂载前
   created(){
    // 当进入页面后需要将父传子的数据list转交给data
    this.newList = this.lists;
    // 判断数据是否获取到，获取到之后去除loading组件
    if (this.newList.length > 0) {
      this.loading = false;
    } else {
      this.loading = true;
    }
   },
   //过滤器 
   filters:{
      parseActors:function(value){
        let actors = '';
        value.forEach((element) => {
           actors += element.name + " ";
        });
        return actors;
      }
   },
   methods: {
       goDetail:function(filmId){
           this.$router.push({name:'detail',params:{filmId}});
       },
    //获取数据的方法
       getData:async function(){
           if (this.flag) {
               this.pageNum++;
               if (this.type == 1) {
                   var ret = await nowPlayingListData(this.pageNum);
               }else{
                   var ret = await comingSoonListData(this.pageNum);
               }
               if (ret.data.data.films.length < 10) {
                   this.flag = false;
               } 
                       // 将数据处理好新增到列表中去
             this.newList = this.newList.concat(ret.data.data.films);
           }
       }
   },
   updated(){
 this.bs = new BScroll('.scroll', {
                // 激活上滑动的事件监听
                pullUpLoad: true,
                // 激活下滑的事件监听
                pullDownRefresh: true,
                // 默认情况下使用bs后，它会禁止浏览器的点击事件
                click: true
            })
            // 上拉刷新
            this.bs.on('pullingUp', () => {
                // console.log('上拉刷新')
                // 获取数据
                 this.getData();
                //本次pullup动作已经完成，继续准备下一次pullup
                this.bs.finishPullUp()
            })
            this.bs.on('pullingDown', () => {
                // console.log('下拉刷新')
                // 获取数据
                 this.getData();
                //本次pulldown动作已经完成，继续准备下一次pulldown
                this.bs.finishPullDown()
            })
   }
}
</script>

<style lang="scss" scope>
.scroll {
	overflow: hidden;

.list{
padding-bottom: 55px;
.item {
    width: 100%;
    height: 124px;
    border-bottom: 1px solid #ededed;
    display: flex;
  .left {
      margin-top: 15px;
      margin-left: 15px;
      width: 66px;
      height: 94px;
    img {
      width: 100%;
    }
  }

  .middle {
      margin-left: 15px;
      font-size: 13px;
      padding-top: 12px;
      color: #797d82;
      div{
          padding-top: 5px;
      }
       div:nth-child(1){
          color: #191a1b;
          font-size: 16px;
       }
       div:nth-child(3){
           overflow: hidden;
           width: 209px;
           white-space: nowrap;
           text-overflow: ellipsis;
       }
       .grade{
            color: #ffb232;
            font-size: 14px;
       }
  }

  .right { 
        width: 50px;
        display: flex;
        align-items: center;
        margin-right: 20px;
    span {
        height: 25px;
        // display: block;
        color: #ff5f16;
        width: 50px;
        border: 1px solid #ff5f16;
        border-radius: 2px;
        text-align: center;
        line-height: 25px;
    }
  }
}
}
}
</style>