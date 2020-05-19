<template>
  <div id="app" class="h-100">

    <router-view/>

  </div>
</template>

<style lang="less">

  html, body {
    height: 100%;
  }
  body {
    margin: 0 auto;
  }
  * {
    user-select: none;
  }

  // 自定义滚动条样式
  .scroll::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 12px;
  }
  .scroll::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : rgba(0, 0, 0, .35);
  }
  .scroll::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #f6f6f6;
  }
  
  .h-100 {
    height: 100%;
  }
  .w-100 {
    width: 100% !important;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix::after {
    content: '.';
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
  }
  .auto-img {
    display: block;
    height: 100%;
    width: 100%;
  }

  .overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .flex {
    display: flex;
  }

</style>
