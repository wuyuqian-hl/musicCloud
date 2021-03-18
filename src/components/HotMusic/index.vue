<template>
  <div class="container" v-height="127">
    <Loading v-if="loading"></Loading>
    <div class="Hotmusic">
      <div class="music"></div>
      <span>更新日期：{{Time.updataTime | changeTime}}</span>
    </div>
    <!-- 音乐列表 -->
    <div class="songList">
      <div v-for="(item,index) in newSong" :key="index" @click="musicDetails(item)">
      <div class="song">
        <div class="songinfo">
          <p>{{item.name}}</p>
          <p class="info"><span :class="{'icon':item.song.copyright == 1}"></span>{{item.song.artists[0].name}}<span>-{{item.name}}</span></p>
          <div class="playbutton"></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Loading from '../Loading/index'
  export default {
    components:{
      Loading 
    },
    data(){
      return {
        newSong:[],
        Time:[],
        loading:false,
      }
    },
    created(){
      this.getnewsong()
      this.getTime()
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
      getnewsong(){
        this.loading = true;
        this.$http.get('/api/personalized/newsong').then((res)=>{
          this.newSong = res.data.result;
          this.loading = false;
        })
      },
      getTime(){
        this.$http.get('/api/top/list?idx=1').then((res)=>{
          this.Time = res.data.playlist;
        })
      }
    },
    filters:{
      changeTime(val){
        return moment(val).format('MM月DD日')
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  overflow: auto;
  .Hotmusic{
    padding-top: 145px;
    overflow: hidden;
    background: url(../../assets/img/hot_music_bg.jpg) no-repeat;
    background-size: 100%;
    position: relative;
    .music{
      position: absolute;
      top: 15px;
      left: 30px;
      width: 100%;
      height: 100px;
      // padding-top: 100px;
      background: url(../../assets/img/index_icon.jpg) no-repeat -30px -27px;
      background-size: 50%;
    }
    span{
      position: absolute;
      bottom: 15px;
      left: 30px;
      color: #fff;
      font-size: 14px;
    }
  }
  .songList{
    width: 100%;
    height: calc(100% - 100px);
    top: 0px;
    left: 0;
    position: relative;
  }
    .song{
    width:calc( 100% - 16px);
    padding: 8px;
    height: 100%;
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
}
</style>