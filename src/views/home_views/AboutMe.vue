<template>
  <div class="about-me h-100">

    <div class="top-nav clearfix">
      <div class="fl">系统设置</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">关于我们</div>
    </div>

    <div class="container scroll">
      <div class="me-box">
        <div class="m-title">关于我们</div>
        <p class="desc">无穷影视定位为一个娱乐文化传播的平台，致力于帮助用户选择想看的影片，我们紧紧围绕七大选片原则：评分高、收视率高、播放量高、口碑好、获奖影片、搜索热度高，把一些好的影片通过多元化方式找出来，让大家远离低俗和没有"营养"的片子，减少选择的烦恼。</p>
        <div class="s-title">我们的服务</div>
        <ol>
          <li>影视奖项和获奖影片</li>
          <li>排行榜：票房榜、搜索指数榜等各类排行榜</li>
          <li>优选影单：由用户推荐影片和看过的用户感受形成的影单</li>
          <li>分集剧情介绍</li>
          <li>各类话题：角色话题、剧情话题、影视文化等紧紧围绕影片相关的话题</li>
          <li>经典角色的探讨和资料分享</li>
          <li>细化的用户常用的影视标签</li>
          <li>电影、电视剧全网影片的资料库</li>
          <li>演员的资料库</li>
        </ol>
      </div>
    </div>

  </div>
</template>

<script>

  import { utils } from '@/utils/utils'
  export default {
    name: 'AboutMe',
    data() {
      return {
        infoList: [],
      }
    },
    created() {


    },

  }
</script>

<style lang="less" scoped>

  .container {
    height: calc(100% - 101px);
    padding: 10px 15px 35px;
    margin-top: 10px;
    overflow-y: auto;
    .me-box {
      padding: 35px 15px;
      border-radius: 12px;
      background: #fff;
      .m-title {
        font-size: 20px;
        text-align: center;
      }
      p {
        text-indent: 2em;
      }
      .s-title {
        font-weight: 700;
      }
    }
  }

  .top-nav {
    height: 45px;
    line-height: 45px;
    margin: 0 15px;
    border-bottom: 1px solid #ccc;
    color: #666;
    .current-nav {
      color: #007aff;
      cursor: pointer;
    }
  }

</style>