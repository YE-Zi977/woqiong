<template>
  <div class="my-info h-100">

    <div class="top-nav clearfix">
      <div class="fl">资讯管理</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">我的资讯</div>
    </div>

    <div class="container scroll" @scroll="scrollHandle">
      <div class="info-box">
        <a name="a3"></a>
        <div v-if="infoList.length <= 0" class="no-result">暂无资讯，快去发布吧~</div>
        <div class="info-item" v-for="(item, index) in infoList" :key="index">
          <div class="clearfix">
            <div class="photo fl"><img class="auto-img" :src="item.avatar" ></div>
            <div class="fl">
              <div class="nickname overflow">{{item.nickname}}</div>
              <div class="time">{{item.created_at | date}}</div>
            </div>
            <div class="remove fr" @click="remove(index, item.info_id)"><i class="el-icon-delete-solid"></i></div>
          </div>
          <div class="text" v-html="showEm(item.text)"></div>
          <div class="img-box clearfix">
            <div class="item" v-for="img in item.photo_img" :key="img"><img class="i-img" :src="img" ></div>
          </div>
          <div class="count-box clearfix">
            <div class="count fl">121次浏览</div>
            <div class="fr clearfix">
              <div class="fl t-icon"><img class="auto-img" src="@/assets/images/star1.png" ></div>
              <div class="fl t-icon"><img class="auto-img" src="@/assets/images/say.png" ></div>
              <div class="fl t-icon"><img class="auto-img" src="@/assets/images/link.png" ></div>
            </div>
          </div>
          <div v-if="star.length > 0" class="star-box flex">
            <div class="s-icon"><img class="auto-img" src="@/assets/images/star2.png"></div>
            <div class="star-list overflow">
              <span class="item" v-for="(item, index) in star" :key="index">{{item}}<i v-if="index !== star.length - 1">、</i></span>
            </div>
            <div>等{{star.length}}人觉得很赞</div>
          </div>
          <div class="say-box">
            <input type="text" placeholder="我也说一句" />
          </div>
        </div>
      </div>
    </div>

    <a class="go-top" v-if="isShow" href="#a3"><img src="@/assets/images/top.png" title="回顶部"></a>

  </div>
</template>

<script>

  import { utils } from '@/utils/utils'
  export default {
    name: 'MyInfo',
    data() {
      return {
        infoList: [],
        star: ['◣神秘青年◢', '爱的╮尾声', 'Щ 不变的守候', '我只是路人←→', '／/一直的思念°', '◇ヽ心海断了殇╰★', '﹌○﹋执着的爱', '丶1切都是假的', 'ゆ 今生的爱恋 。', 'ご姐很爱你﹌', '@冰点电脑'],
        timers: [],
        isShow: false
      }
    },
    created() {

      // 获取资讯数据
      this.getInfo();

    },
    methods: {

      // 获取资讯数据
      getInfo() {

        this.axios({
          method: 'get',
          url: '/lookInfo',
          params: {
            isAll: 1
          }
        }).then(res => {
          
          if (res.data.code === 1130) {
            this.infoList = res.data.result;
          }else {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'warning',
              duration: 1500
            });
          }

        })

      },
      
      showEm(v) {
        let html = v.split('[@em_');
        html = html.map(value => {
          if (value.indexOf('@]') > -1) {
            return '<img style="vertical-align: -5px; margin-left: 2px;" src="' + require('@/assets/images/icon/' + parseInt(value) + '.gif') + '" />'
          }
          return value
        })

        return html.join('')
      },

      // 删除
      remove(index, infoId) {

        this.$confirm('此操作不可逆, 是否继续?', '删除资讯', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {

          // 发起请求
          this.axios({
            method: 'post',
            url: '/removeInfo',
            data: {
              infoId
            }
          }).then(res => {
            
            if (res.data.code === 1140) {

              this.infoList.splice(index, 1);
              this.$message({
                message: res.data.msg,
                center: true,
                type: 'success',
                duration: 1500
              });
            }else {
              this.$message({
                message: res.data.msg,
                center: true,
                type: 'warning',
                duration: 1500
              });
            }
          })

        }).catch(() => {

        })

      },

      // 滚动事件处理
      scrollHandle(e) {

        this.timers.push(setTimeout(() => {

          for (let i = 1; i < this.timers.length; i++) {
            clearTimeout(this.timers[i]);
          }

          let top = e.target.scrollTop;
          
          this.isShow = top >= 600;

        }, 500));

      }

    },
    filters: {
      date(v) {
        let date = new Date(v);
        return utils.handleDate(date, '-') + ' ' + utils.handleTime(date, ':');
      }
    }

  }
</script>

<style lang="less" scoped>

  .go-top {
    position: fixed;
    right: 80px;
    bottom: 80px;
    width: 60px;
    height: 60px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 50px;
      height: 50px;
    }
  }

  .container {
    height: calc(100% - 101px);
    padding: 10px 15px 35px;
    margin-top: 10px;
    overflow-y: auto;
    .info-box {
      padding: 35px 15px;
      border-radius: 12px;
      background: #fff;
      .no-result {
        text-align: center;
      }
      .info-item {
        width: 60%;
        margin-bottom: 40px;
        .photo {
          width: 60px;
          height: 60px;
          margin-right: 10px;
          cursor: pointer;
        }
        .nickname {
          max-width: 500px;
          margin-top: 6px;
          line-height: 25px;
          cursor: pointer;
        }
        .time {
          font-size: 12px;
          margin-top: 5px;
          color: #666;
        }
        .remove {
          margin-top: 10px;
          font-size: 18px;
          color: #666;
          cursor: pointer;
        }
        .text {
          margin: 20px 0;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
        }
        .img-box {
          width: 630px;
          padding-bottom: 5px;
          .item {
            float: left;
            width: 200px;
            height: 200px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: #eee;
            cursor: pointer;
            overflow: hidden;
            .i-img {
              display: block;
              width: 100%;
              min-height: 200px;
            }
          }
          .item:nth-child(3n) {
            margin-right: 0;
          }
        }
        .count-box {
          margin-bottom: 15px;
          .count {
            color: #666;
            cursor: pointer;
          }
          .t-icon {
            width: 18px;
            height: 18px;
            margin-left: 25px;
            cursor: pointer;
          }
        }
        .star-box {
          padding: 20px 0;
          border-top: 1px solid #ebebeb;
          line-height: 22px;
          .s-icon {
            width: 22px;
            height: 22px;
            margin-right: 5px;
          }
          .star-list {
            width: calc(100% - 135px);
          }
          .item {
            color: #007aff;
            cursor: pointer;
            i {
              color: #000;
            }
          }
        }
        .say-box {
          input {
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #ebebeb;
            outline: none;
            transition: border-color .8s linear;
          }
          input:focus {
            border-color: #999;
          }
        }
      }
      .info-item:last-child {
        margin-bottom: 0;
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