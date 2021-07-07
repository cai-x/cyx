<template>
    <div>
        <FilmList :lists="list" :type="type" :key="'film'+list.length"></FilmList>
    </div>
</template>

<script>
import {comingSoonListData} from '@/api/api';
import FilmList from '@/components/FilmList';
export default {
    components:{FilmList},
    data(){
        return{
            page:1,
            list:[],
            type:2
        }
    },
    async mounted() {
        let ret = await comingSoonListData(this.page);
        this.list = ret.data.data.films;
    },
}
</script>