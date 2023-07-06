<template>
  <div class="container-share">
    <!-- 生成提示 -->
    <div class="generatting" v-if="!imgUrl">
      <div>
        <div class="text">海报生成中……</div>
      </div>
    </div>


    <div class="tips">长按保存海报，也可直接发送给好友</div>
    <img class="image-share" :src="imgUrl"  alt="" />
    <div style="height: 600px;"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const imgUrl = ref('');

onMounted(() => {
  getData();
});


const getData = () => {
  // 1. 获取动态数据

  // 2. htmltocanvas => 生成图片（base64）
  setTimeout(() => {
    imgUrl.value = ''
    imgUrl.value = 'http://img10.360buyimg.com/img/jfs/t1/46209/15/4514/264964/5d2304d5E35b73b67/b3396098603dc456.png';
  }, 1000);

  
}


</script>


<style scoped lang="scss">
.container-share {
  .tips {
    position: fixed;
    top: 0;
    width: 100vw;
    text-align: center;
    height: 36px;
    line-height: 36px;
    background-color: rgba(255,255,255,0.9);
    font-size: 13px;
    color: #808080;
    user-select: none;
  }
}

.generatting {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}


.image-share {
  margin-top: 36px;
  display: block;
  width: 100%;
}
</style>
