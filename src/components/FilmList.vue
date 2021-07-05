<template>
  <div class="list">
    <Loading v-if="loading"></Loading>
    <!-- 数据展示 -->
    <div class="item" v-for="(item,index) in lists" :key="index" v-else @click="goDetail(item.filmId)">
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
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
   components:{Loading},
   props:['lists','type'],
   data() {
       return {
           loading:true
       }
   },
   //页面挂载前
   created(){
    if (this.lists.length > 0) {
        this.loading = false
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
       }
   },
}
</script>

<style lang="scss" scope>
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
        display: block;
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
</style>