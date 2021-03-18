<template>
  <div class="container">
    <van-loading type="spinner" size="34px" class="loding" />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
.container{
  height:calc( 100% );
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}
</style>