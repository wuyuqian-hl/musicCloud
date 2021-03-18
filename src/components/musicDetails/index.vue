<template>
  <div class="container" v-height='0'>
    <audio :src="songUrl" v-if="songUrl" ref="playmusic"></audio>
    <div class="bgk" :style="{'background-image':'url('+picUrl+')'}"></div>
    <div class="playbgk">
      <div class="musicbg" @click="playMusic">
        <div class="bgmusic">
          <div class="playbtn" v-if="playmusic"></div>
          <img :src="picUrl" alt="" class="playroute" :class="{'stoproute':stoproute}">
          <div class="lunpang"></div>
        </div>
        <div class="sutiao"></div>
        <div class="logo">
          <img src="../../assets/img/lo.png" alt="">
          <h3>网易云音乐</h3>
        </div>
      </div>
      <!-- 歌名信息 -->
      <div class="musicinfo">
        <div>{{name}}-<span>{{songName}}</span></div>
        <div class="geci" >
          <div v-for="(item,index) in lyricbg" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="openApp">
        <van-button round plain size="large" type="danger">打开</van-button>
        <van-button round size="large" type="danger">下载</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name:null,
        picUrl:null,
        songUrl:null,
        songName:null,
        playmusic:true,
        stoproute:false,
        musicLyric:{},
        Lyric:{},
        lyricbg:[]
      }
    },
    created(){
      this.name = this.$route.query.name;
      this.picUrl = this.$route.query.picUrl;
      this.songName = this.$route.query.songName;
      this.songUrl = 'https://music.163.com/song/media/outer/url?id='+this.$route.query.id+'.mp3';
      console.log(this.picUrl)
      this.getlyric()
    },
    methods:{
      getlyric(){
        this.$http.get('/api/lyric',{
          params:{
            id:this.$route.query.id
          }
        }).then((res)=>{
          this.musicLyric = res.data.lrc.lyric;
          let reg = /\[(.*?)](.*)/g;
          this.musicLyric.replace(reg, (a, b, c) => {
            b = b.slice(0,5);
            this.Lyric[b] = c;
             this.lyricbg.push(c)
          });
        })
      },
      playMusic(){
        if(this.playmusic){
          this.playmusic=false;
          this.$refs.playmusic.play()
          this.stoproute = true;
        }else{
          this.playmusic=true;
          this.$refs.playmusic.pause()
          this.stoproute = false;
        }
      },
      // 歌词显示
     
    }
  }
</script>

<style lang="less" scoped>
.container{
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
.bgk{
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  filter:blur(5px);
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  transform-origin: top center;
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background:rgba(0, 0, 0, .3) ;
  }
}
.playbgk{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .logo{
    position: absolute;
    top: 15px;
    left: 10px;
    width: 100%;
    display: flex;
    height: 100%;
    img{
      width: 25px;
      height: 25px;
      border-radius: 8px;
      vertical-align: middle;
    }
    h3{
      color: #fff;
      font-size: 18px;
      position: absolute;
      top: 0px;
      left: 30px;
      vertical-align: middle;
    }
  }
  .sutiao{
    position: absolute;
    width: 100%;
    height: 160px;
    top: 0;
    left: 48%;
    background: url(../../assets/img/needle-ip6.png) no-repeat;
    background-size: 30%;
  }
  .musicbg{
    padding-top: 70px;
    .bgmusic{
      width: 298px;
      height: 298px;
      margin: 0 auto;
      position: relative;
      top: 0;
      left: 0;
      .playbtn{
        width: 54px;
        height:54px;
        position: absolute;
        top:50%;
        left:50%;
        z-index: 10;
        transform: translate(-50%,-50%);
        background: url(../../assets/img/lock.png) no-repeat;
        background-size: 100%;
      }
      .lunpang{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../assets/img/disc-ip6.png) no-repeat;
        background-size: 100%;
      }
      .playroute{
        display: inline-block;
        width: 190px;
        height: 190px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        animation: donghua 10s linear infinite 0s;
        animation-play-state: paused;
        @keyframes donghua {
          from{
            transform: translate(-50%,-50%) rotate(0deg);
          }
          to{
            transform: translate(-50%,-50%) rotate(360deg);
          }
        }
        &.stoproute{
          animation-play-state: running;
        }
      }
    }
  }
  .musicinfo{
    position: relative;
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    margin-top: 15px;
    span{
      color: #ccc;
      font-size: 15px;
    }
    .geci{
      position: relative;
      text-align: center;
      height: 330px;
      overflow:hidden;
    }
  }
  .openApp{
    position: fixed;
    top: 92%;
    left: 0px;
    z-index: 20;
    width: 100%;
    height: 100%;
    display: flex;
    padding-right: 10px;
    &/deep/ .van-button{
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
}
</style>