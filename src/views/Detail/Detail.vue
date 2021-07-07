<template>
  <div>
      <div class="detail">
        <div class="img">
            <img v-lazy="film.poster" />
        </div>
        <div>
            <div>
                <span>{{film.name}}</span>
                <span>{{film.grade}}</span>
            </div>
            <div>{{film.category}}</div>
            <div>{{film.premiereAt | parsePremiereAt}}上映</div>
            <div>中国大陆 | {{film.runtime}} 分钟</div>
            <div>{{film.synopsis}}</div>
        </div>
    </div>
    <Swiper :key="'actors_'+film.actors.length">
        <div v-for="(item,index) in film.actors" :key="index" class="swiper-slide">
          <div>
            <img :src="item.avatarAddress" alt="">
          </div>
        </div>
    </Swiper>
  </div>
</template>
<script>
import {detailData} from '@/api/api';
import moment from 'moment';
import Swiper from '@/components/Swiper';
export default {
    components:{Swiper},
    data() {
        return {
            film:{actors:[]}
        }
    },
    async mounted() {
        let ret = await detailData(this.$route.params.filmId);
        console.log(ret.data.data.film);
        this.film = ret.data.data.film;
    },
    // 过滤器
    filters:{
        parsePremiereAt:function(value){
            return moment(value*100).format('YYYY-MM-DD');
        }
    },
    created(){
        this.eventBus.$emit("footerNav",false);
    },
    // 页面跳转是触发
    beforeDestroy(){
        this.eventBus.$emit("footerNav",true);
    }
}
</script>

<style lang="scss" scoped>
.detail{
    .img{
        width: 100%;
        height: 290px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.swiper-slide {
    img {
       width: 80px; 
    }
}
</style>