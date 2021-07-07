<template>
    <div>
        <FilmList :lists="list" :type="type" :key="'film'+list.length"></FilmList>
    </div>
</template>

<script>
import {nowPlayingListData} from '@/api/api';
import FilmList from '@/components/FilmList';
export default {
    components:{FilmList},
    data() {
        return {
            page:1,
            list:[],
            type:1
        }
    },
    // 异步请求要加async  await
    async mounted() {
        let ret = await nowPlayingListData(this.page)
        // console.log(ret.data.data.films);
        this.list = ret.data.data.films;
    },
}
</script>