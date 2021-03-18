<template>
  <div>
    <van-search
      v-model="Searchvalue"
      shape="round"
      background="#fff"
      placeholder="搜索歌曲，歌手，专辑"
      @input="changedsearch"
      @clear="removevalue"
      @blur="getList"
    />
    <div class="hotTrending" v-if="showHot" >
      <p>热门搜索</p>
      <span @click="changevalue(item.first)" v-for="(item,index) in hotWord" :key="index">{{item.first}}</span>
    </div>
    <!-- 音乐列表 -->
    <div class="songList" v-if="Searchvalue">
      <div v-for="(item,index) in hotsearch" :key="index" @click="musicDetails(item)">
        <div class="song">
          <div class="songinfo">
            <p>{{item.name}}</p>
            <p class="info"></span>{{item.artists[0].name}}<span>-{{item.name}}</span></p>
            <div class="playbutton"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        Searchvalue:null,
        hotWord:[],
        showHot:true,
        hotsearch:[],
      }
    },
    created(){
      this.getHotword();
    },
    methods:{
      musicDetails(item){
        console.log(item)
        let obj = {
          path:'/musicDetails',
          query:{
            id:item.id,
            name:item.name,
            picUrl:item.artists[0].img1v1Url,
            songName:item.artists[0].name,
          }
        }
        this.$router.push(obj)
      },
      getHotword(){
        this.$http.get('/api/search/hot').then((res)=>{
          this.hotWord = res.data.result.hots;
        })
      },
      getvalue(){
        this.$http.get('/api/search',{
          params:{
            keywords:this.Searchvalue,
          }
        }).then((res)=>{
          this.hotsearch = res.data.result.songs;
        })
      },
      // 热门词
      changevalue(val){
        if(!val) return
        this.Searchvalue=val;
        this.showHot = false;
        this.getvalue()
      },
      // 搜索词
      changedsearch(val){
        if(!val) return
        if(val){
          this.showHot = false;
          this.getvalue()
        }
      },
      getList(){
        this.getvalue()
      },
      removevalue(){
        this.Searchvalue = null;
        this.showHot = true;
      }
    }
  }
</script>

<style lang="less" scoped>
&/deep/ .van-search{
  border-bottom: 1px solid #ccc;
}
.hotTrending {
  width: calc(100% - 10px);
  padding-left: 10px;
  padding-top: 10px;
  position: relative;
  top: 0;
  left: 0;
  P{
    font-size: 12PX;
    color: rgb(85, 79, 79);
  }
  span{
    display: inline-block;
    line-height: 32px;
    padding-right: 14px;
    border: 1px solid #ccc;
    border-radius: 32px;
    height: 32px;
    margin: 5px;
    padding-left: 14px;
  }
}
.songList{
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
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
}
</style>