<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/img/01.gif" alt="">
      <img src="../../assets/img/02.gif" alt="">
    </div>
    <van-tabs v-model="active" @click="changePage" line-width="58px">
      <van-tab title="推荐音乐"></van-tab>
      <van-tab title="热歌榜"></van-tab>
      <van-tab title="搜索"></van-tab>
    </van-tabs>
    <div v-if="changeType">
      <component :is="changeType"></component>
    </div>
  </div>
</template>

<script>
  export default {
    components:{
      Recommend:()=>import('../Recommend/index'),
      HotMusic:()=>import('../HotMusic/index'),
      SearchMusic:()=>import('../SearchMusic/index')
    },
    data(){
      return {
        active:0,
        changeType:'Recommend'
      }
    },
    methods:{
      changePage(val){
        if(val == 0){
          this.changeType='Recommend'
        }else if(val == 1){
          this.changeType='HotMusic'
        }else if(val == 2){
          this.changeType='SearchMusic'
        }
      }
    }

  }
</script>

<style lang="less" scoped>
.logo{
  padding-top: 70px;
  display: flex;
  background: #d43c33;
  justify-content: space-between;
  padding: 20px 5px;
}
&/deep/ .van-tab{
  border-bottom: 1px solid #ccc;
}
</style>