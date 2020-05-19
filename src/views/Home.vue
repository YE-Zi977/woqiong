<template>
  <div class="home scroll">
    <!-- 头部 -->
    <div class="top-box clearfix">
      <div class="fl clearfix">
        <div class="logo-box fl">
          <img class="auto-img" src="@/assets/images/logo.png" />
        </div>
        <div class="t-title fl">无穷影视 | 商家端后台管理系统</div>
      </div>
      <div class="fr t-right clearfix">
        <div class="fl t-com overflow">欢迎您，{{isLogin ? userInfo.nickname : '请先登录'}}</div>
        <div class="fl t-date">{{currentDate.year}}年{{currentDate.month | zero}}月{{currentDate.day | zero}}日</div>
        <div class="fl">星期{{days[currentDate.week]}}</div>
      </div>
    </div>

    <div class="bottom-box clearfix">
      <!-- 左盒子 -->
      <div class="left-box scroll fl">
        <div class="info-box clearfix">
          <div class="i-photo fl">
            <img class="a-img" :src="userInfo.avatar">
          </div>
          <div @click="toPage({name: 'Login'}, isLogin)" :title="isLogin ? userInfo.nickname : '去登录'" class="nickname overflow fl" :class="isLogin ? '' : 'login'">{{userInfo.nickname}}</div>
        </div>
        <el-menu
          :default-active="$route.path"
          unique-opened
          router
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="#000"
          active-text-color="#007aff"
          @open="toggle"
        >
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-video-camera-solid"></i>
              <span>电影管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/movie-list">电影产品</el-menu-item>
              <el-menu-item index="/home/add-movie">发布电影</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>资讯管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/my-info">我的资讯</el-menu-item>
              <el-menu-item index="/home/add-info">发布资讯</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/settings">安全设置</el-menu-item>
              <el-menu-item index="/home/about-me">关于我们</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <div class="current-nav" :style="{top: top + 'px'}"></div>
      </div>
      <!-- 右盒子 -->
      <div class="right-box fl">

        <!-- 二级路由 -->
        <router-view />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 箭头top值
      top: 105,

      // 用户信息
      userInfo: {
        nickname: '',
        avatar: ''
      },

      // 是否登录
      isLogin: false,

      // 当前日期
      currentDate: {
        year: null,
        month: null,
        day: null,
        week: null
      },

      // 星期预选值
      days: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  created() {

    // 获取商家个人信息
    this.getBusinessInfo();

    // 设置时间
    this.setDate();
   
  },
  methods: {

    // 箭头切换
    toggle(index) {
      this.top = 105 + index * 56;
    },

    // 获取商家个人信息
    getBusinessInfo() {
      this.axios({
        method: 'get',
        url: '/businessInfo',

      })
      .then(res => {

          if (res.data.code === 1050) {
            //获取用户信息成功
            let info = res.data.result[0];

            this.userInfo.nickname = info.nickname;
            this.userInfo.avatar = info.avatar;
            this.isLogin = true;
          }else {

            this.userInfo.nickname = '未登录';
            this.userInfo.avatar = require('@/assets/images/default.png');
            this.isLogin = false;
          }

      })
    },

    // 设置时间
    setDate() {
      let currentTime = new Date();

      this.currentDate.year = currentTime.getFullYear();
      this.currentDate.month = currentTime.getMonth() + 1;
      this.currentDate.day = currentTime.getDate();

      this.currentDate.week = currentTime.getDay();
      
    },

    // 页面跳转
    toPage(path, isTo) {

      if (isTo) {
        return;
      }

      this.$router.push(path);
    }

  },

  filters: {
    zero(v) {
      return v < 10 ? '0' + v : v;
    }
  }

};
</script>

<style lang="less" scoped>
.bottom-box {
  height: calc(100% - 61px);
  min-width: 1300px;
  .left-box {
    position: relative;
    width: 18%;
    height: 100%;
    overflow-y: auto;
    background: #f6f6f6;
    .current-nav {
      position: absolute;
      top: 105px;
      right: 0;
      height: 0;
      width: 0;
      border-right: 10px solid #141a32;
      border-left: 10px solid transparent;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      transition: top .2s linear;
    }
    .info-box {
      padding: 25px;
      border-bottom: 1px solid rgb(204, 204, 204);
      .i-photo {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        .a-img {
          display: block;
          width: 100%;
          min-height: 100%;
        }
      }
      .nickname {
        width: calc(100% - 51px);
        margin-left: 15px;
        line-height: 36px;
        font-size: 14px;
        cursor: pointer;
      }
      .nickname.login {
        color: rgb(0, 122, 255);
        text-decoration: underline;
      }
    }
  }
  .left-box::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #141a32;
  }
  .right-box {
    width: 82%;
    height: 100%;
    overflow-y: auto;
    font-size: 14px;
    background: #f6f6f6;
  }
}

.home {
  height: 100%;
  overflow: auto;
}
.top-box {
  height: 60px;
  min-width: 1300px;
  color: #fff;
  background: rgb(75, 96, 132);
  .t-com {
    width: 400px;
    text-align: right;
  }
  .off-btn:active {
    background: rgba(0, 0, 0, 0.15);
  }
  .logo-box {
    width: 36px;
    height: 36px;
    margin: 12px 15px 0 35px;
    border-radius: 4px;
  }
  .t-title {
    line-height: 60px;
    font-weight: bold;
  }
  .t-right {
    margin-right: 70px;
    font-size: 14px;
    line-height: 60px;
    .t-date {
      margin: 0 15px 0 35px;
    }
  }
}
</style>
