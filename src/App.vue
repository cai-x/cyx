<template>
  <div id="app">
    <FooterNav v-if="is_show"></FooterNav>
    <router-view/>
  </div>
</template>

<script>
import FooterNav from '@/components/FooterNav';
export default {
  data(){
    return{
      is_show:true
    }
  },
  components:{
    FooterNav
  },
  created(){
    this.eventBus.$on("footerNav",(flag)=>{
      this.is_show = flag;
    })
  }
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  touch-action: none;//禁止缩放
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
