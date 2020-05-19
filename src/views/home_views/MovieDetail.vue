<template>
  <div class="movie-detail h-100">

    <div class="top-nav clearfix">
      <div class="fl">电影管理</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav" @click="toPage({name: 'MovieList'})">电影产品</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">电影详情</div>
    </div>

    <div v-for="(movieDetail, index) in movieDetailList" :key="index" class="container scroll">
      <div class="movie-box">
        <div class="top-title">{{movieDetail.name}}</div>
        <div class="clearfix">
          <div class="fl cover">
            <img class="auto-img" :src="movieDetail.coverList[0].imgUrl" />
          </div>
          <div class="fl detail">
            <div>导演：{{movieDetail.director | split}}</div>
            <div>演员：{{movieDetail.actorList | split}}</div>
            <div>类型：{{movieDetail.type | split}}</div>
            <div>电影模式：{{movieDetail.mode}}</div>
            <div>上映日期：{{movieDetail.date | date}}</div>
            <div>片长：{{movieDetail.time}}</div>
            <div>电影英文名称：{{movieDetail.enName}}</div>
          </div>
        </div>
        <div class="desc-box">
          <div class="d-title">{{movieDetail.name}}的剧情简介<font> . . . . . .</font></div>
          <div class="desc">{{movieDetail.desc | more}}</div>
        </div>
        <div class="actor-box">
          <div class="d-title">{{movieDetail.name}}的演员表<font> . . . . . .</font>( 全部 {{movieDetail.actorList.length}} )</div>
          <div class="actor-list clearfix">
            <div class="actor-item fl" v-for="(item, index) in movieDetail.actorList" :key="index">
              <div class="img-box">
                <img class="auto-img" :src="item.imgUrl" />
              </div>
              <div class="name overflow">{{item.name}}</div>
            </div>  
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import { utils } from '@/utils/utils'
  export default {
    name: 'MovieDetail',
    data() {
      return {
        movieDetailList: []
      }
    },
    created() {

      // 获取电影详情
      let movieId = this.$route.params.movieId;

      if (movieId === undefined) {
        
        this.$router.push({name: 'MovieList'});
      }else {

        this.getMovieDetail(movieId);
      }

    },
    methods: {

      // 获取电影详情
      getMovieDetail(movieId) {
        
        // 发起请求
        this.axios({
          method: 'get',
          url: '/lookMovie',
          params: {
            movieId,
            isAll: 0
          }
        })
        .then(res => {
          
          if (res.data.code === 1080) {
            this.movieDetailList.push(res.data.result[0]);
          }else {

            this.$message({
              message: res.data.msg,
              center: true,
              type: 'warning',
              duration: 1500
            });
            this.$router.push({name: 'MovieList'});
          }

        })

      },

      // 跳转页面
      toPage(path) {
        this.$router.push(path);
      }

    },
    filters: {
      split(params) {
        let type = Object.prototype.toString.call(params);

        if (type === '[object String]') {
          return params.replace(/,/g, ' / ');
        }

        if (type == '[object Array]') {
          let temp = '';
          params.forEach(v => {
            temp += v.name + ' / ';
          });
          return temp.slice(0, -3);
        }

      },

      date(params) {
        return utils.handleDate(new Date(params), '-');
      },

      more(params) {
        if (params.slice(-6) == '......' || params.slice(-2) == '……') {
          return params;
        }else {
          return params + '......';
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  img {
    cursor: pointer;
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

  .container {
    height: calc(100% - 101px);
    margin-top: 10px;
    padding: 10px 15px 35px;
    overflow-y: auto;
    .movie-box {
      padding: 30px 10px 60px 45px;
      background: #fff;
      border-radius: 12px;
      .actor-item {
        width: calc(100% / 6 - 15px);
        margin-right: 18px;
        .img-box {
          width: 100%;
          max-height: 300px;
        }
        .name {
          width: 100%;
          margin-top: 10px;
          font-size: 15px;
          text-align: center;
        }
      }
      .actor-item:last-child {
        margin-right: 0;
      }
      .top-title {
        margin: 15px 0 25px;
        font-size: 30px;
        font-weight: bold;
        color: #555;
      }
      .cover {
        height: 400px;
        width: 270px;
        margin-right: 15px;
      }
      .detail {
        width: 550px;
        margin-top: 10px;
        >div {
          font-size: 15px;
          line-height: 25px;
          color: #555;
        }
      }
      .d-title {
        margin: 30px 0 15px;
        font-size: 18px;
        color: rgb(0, 119, 34);
        font {
          vertical-align: 4px;
        }
      }
      .desc {
        font-size: 14px;
        text-indent: 2em;
        line-height: 20px;
      }
    }
  }

</style>