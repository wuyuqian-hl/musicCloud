<template>
  <div class="container" v-height='127'>
    <Loading v-if="loading"></Loading>
    <!-- 推荐歌单 -->
    <div class="recommend">
      推荐歌单
    </div>
    <div class="songList">
      <div v-for="(item,index) in Songdata" :key="index" class="pic">
        <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
          <van-icon name="service-o" class="linsten"/>
          <span>{{item.playCount | fliterPlay}}万</span>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="recommend">
      最新音乐
    </div>
    <div v-for="(item,index) in newSong" :key="index" @click="musicDetails(item)">
      <div class="song">
        <div class="songinfo">
          <p>{{item.name}}</p>
          <p class="info"><span :class="{'icon':item.song.copyright == 1}"></span>{{item.song.artists[0].name}}<span>-{{item.name}}</span></p>
          <div class="playbutton"></div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="logo">
        <img src="../../assets/img/lo.png" alt="">
        <h3>网易云音乐</h3>
      </div>
      <div class="openApp">打开APP，发现更多好音乐&nbsp;></div>
      <p>网易公司版权所有@1997-2020 杭州乐读科技有限公司运营</p>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading/index'
  export default {
    components:{
      Loading
    },
    data(){
      return {
        Songdata:[],
        newSong:[],
        loading:false
      }
    },
    created(){
      this.getsongList(),
      this.getnewsong()
    },
    methods:{
      musicDetails(item){
        let obj = {
          path:'/musicDetails',
          query:{
            id:item.id,
            name:item.name,
            picUrl:item.picUrl,
            songName:item.song.artists[0].name,
          }
        }
        this.$router.push(obj)
      },
      getsongList(){
        this.loading = true;
        this.$http.get('/api/personalized?limit=6').then((res)=>{
          this.Songdata = res.data.result;
          this.loading = false;
        })
      },
      getnewsong(){
        this.loading = true;
        this.$http.get('/api/personalized/newsong').then((res)=>{
          this.newSong = res.data.result;
          this.loading = false;
        })
      }
    },
    filters:{
      fliterPlay(val){
        return (val/10000).toFixed(1)
      }
    }
  }

</script>

<style lang="less" scoped>
.container{
  overflow: auto;
  .recommend{
    padding-left:5px;
    margin-top: 5px;
    font-size: 18px;
    border-left: 2px solid rgb(252, 6, 6);
  }
  .songList{
    display: flex;
    margin-top: 5px;
    flex-wrap: wrap;
    div{
      flex: calc(33% - 5px);
      position: relative;
      margin: 3px;
      img{
        width: 100%;
        height: 70%;
      }
      p{
        font-size: 13px;
      }
      .linsten{
        position: absolute;
        top: 0;
        right: 45px;
        color: #fff;
        font-size: 14px;
      }
      span{
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .song{
    width:calc( 100% - 16px);
    padding: 8px;
    border-bottom: 1px solid #ccc;
    position: relative;
    top: 0;
    left: 0;
    .songinfo{
      font-size: 15px;
      .icon{
        display: inline-block;
        width: 23px;
        height:11px;
        background: url(../../assets/img/index_icon.jpg) no-repeat 0px 0px;
        background-size: 1000%;
      }
      .info{
        color: rgb(143, 140, 140);
        padding-top: 5px;
        font-size: 12px;
      }
    }
    .playbutton{
     width: 36px;
      height: 38px;
      position: absolute;
      top: 10px;
      right: 15px;
      background: url(../../assets/img/index_icon.jpg) no-repeat -39px 0px;
      background-size: 750%;
    }
  }
  .footer{
    margin-top: 20px;
    padding-top: 180px;
    position: relative;
    background: url(../../assets/img/recommand_bg_2x.png) no-repeat;
    background-size: 100%;
    .logo{
      position: absolute;
      top: 30%;
      left: 20%;
      display: flex;
      justify-content: space-between;
      img{
        width: 45px;
        height: 45px;
        margin-right: 10px;
        border-radius: 8px;
      }
      h3{
       position: relative;
       top: -5px;
       left: 0;
        font-size: 38px;
      }
    }
    .openApp{
      width: 80%;
      height: 40px;
      position: absolute;
      top: 60%;
      left: 13%;
      line-height: 40px;
      text-align: center;
      border: 1px solid rgba(230, 16, 16, 0.774);
      color:  rgba(230, 16, 16, 0.774);
      border-radius: 32px;
      font-weight: 500;
    }
    p{
      color: rgb(126, 114, 114);
      font-size: 12px;
      position: absolute;
      bottom: 10px;
      left: 12%;
    }
  }
}
</style>