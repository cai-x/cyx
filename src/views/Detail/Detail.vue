<template>
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
</template>
<script>
import {detailData} from '@/api/api';
import moment from 'moment';
export default {
    data() {
        return {
            film:{}
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
    }
}
</script>

<style lang="scss" scoped>
.detail{
    .img{
        width: 100%;
        height: 290px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>