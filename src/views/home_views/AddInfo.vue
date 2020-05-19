<template>
  <div class="add-info h-100">

    <div class="top-nav clearfix">
      <div class="fl">资讯管理</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">发布资讯</div>
    </div>

    <div class="container scroll">
      <div class="info-box">
        <div class="info">
          <el-input
              type="textarea"
              :autosize="{minRows: 5, maxRows: 22}"
              resize="none"
              placeholder="说点什么吧~"
              v-model="infoText"
              maxlength="400"
              show-word-limit>
            </el-input>
        </div>
        <div class="img-box clearfix">
          <div class="item" v-for="(item, index) in photoList" :key="index">
            <img class="item-img" :src="item.base64Url" >
            <div class="clack-box"><div class="remove" @click="remove(index)"><i class="el-icon-delete"></i></div></div>
          </div>
        </div>
        <div class="bottom-box clearfix">
          <div class="fl clearfix">
            <div class="fl t-icon t-open">
              <div class="icon-box scroll">
                <div class="icon-item" @click="insertIcon(item)" v-for="item in iconList" :key="item.title"><img class="auto-img" :src="item.url" ></div>
              </div>
              <div class="t-i"></div>
              <img class="auto-img" src="@/assets/images/icon.png" />
            </div>
            <div class="fl t-icon" @click="() => {this.infoText += '@'}"><img class="auto-img" src="@/assets/images/at.png" /></div>
            <div class="fl t-icon t-photo">
              <img class="auto-img" src="@/assets/images/photo.png" />
              <div class="up-box">
                <upLoad
                type="image/jpg,image/jpeg,image/png,image/PNG,image/webp,image/gif"
                @upLoad="upLoad"
                :disable="photoList.length >= 9">
                </upLoad>
              </div>
            </div>
          </div>
          <div class="fr">
            <span class="c-time">{{currentTime}}</span>
            <el-button @click="submit" type="primary">发布</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import { utils } from '@/utils/utils'
  import upLoad from '@/components/upLoad.vue'
  export default {
    name: 'AddInfo',
    data() {
      return {
        iconList: [],
        infoText: '',
        photoList: [],
        currentTime: '',
        timer: null
      }
    },
    created() {

      this.getTime();

      // 初始化表情
      this.initIcon();

    },
    methods: {

      // 提交
      submit() {

        let text = this.infoText.trim();

        if (text == '') {
          this.$message({
            message: '内容不能为空',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return
        }

        if (utils.vaildReg(text, /[<>&\|']+/g)) {
          this.$message({
            message: '不能包含 <、>、&、/、\'、| 非法字符',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return 
        }

        text = text.replace(/\n{3,}/g, '\n');
        
        // 发起请求
        this.axios({
          method: 'post',
          url: '/releaseInfo',
          data: {
            text,
            photoList: JSON.stringify(this.photoList)
          }
        }).then(res => {

          if (res.data.code === 1120) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });

            // 重置
            this.reset();
          }else {

            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });
          }

        })
        
      },

      // 重置
      reset() {

        this.photoList = [];
        this.infoText = '';

      },

      // 删除图片
      remove(index) {
        this.photoList.splice(index, 1);
      },

      // 上传图片
      upLoad(e) {
        // 控制大小 1M
        let size = 1 * 1024 * 1024;

        if(e.size > size) {
          this.$message({
            message: '图片大小不能超过1Mb',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }

        let file = {
          type: e.type,
          base64Url: e.base64Url
        }

        this.photoList.push(file);

      },

      // 插入表情
      insertIcon(item) {
        this.infoText += item.title;
      },

      // 获取当前时间
      getTime() {

        let date = new Date();
        this.currentTime = utils.handleDate(date, '-') + ' ' + utils.handleTime(date, ':');

        this.timer = setInterval(() => {
          date = new Date();
          this.currentTime = utils.handleDate(date, '-') + ' ' + utils.handleTime(date, ':');
        }, 500)
      },

      // 初始化表情
      initIcon() {
        for (let i = 37; i <= 75; i++) {
          this.iconList.push({title: `[@em_${i}@]`, url: require(`@/assets/images/icon/${i}.gif`)});
        }
      }
    },
    destoryed() {
      clearInterval(this.timer);
    },
    components: {
      upLoad
    }
  }
</script>

<style lang="less" scoped>

  .container {
    height: calc(100% - 101px);
    padding: 10px 15px 35px;
    margin-top: 10px;
    overflow-y: auto;
    .info-box {
      padding: 35px 15px;
      border-radius: 12px;
      background: #fff;
    }
    .img-box {
      width: 560px;
      margin-top: 15px;
      .item {
        position: relative;
        float: left;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        margin-right: 15px;
        border-radius: 8px;
        overflow: hidden;
      }
      .clack-box {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .55);
        .remove {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          cursor: pointer;
        }
      }
      .item:hover .clack-box {
        display: block;
      }
      .item:nth-child(5n) {
        margin-right: 0;
      }
      .item-img {
        display: block;
        width: 100%;
        min-height: 100px;
        cursor: pointer; 
      }
    }
    .bottom-box {
      margin-top: 15px;
      padding-left: 10px;
      .t-icon {
        width: 22px;
        height: 22px;
        margin-right: 20px;
        cursor: pointer;
      }
      .t-open, .t-photo {
        position: relative;
      }
      .icon-box {
        display: none;
        position: absolute;
        bottom: 35px;
        left: -10px;
        width: 234px;
        height: 80px;
        padding: 10px;
        overflow-y: auto;
        border: 1px solid #eee;
        border-radius: 8px;
        background: #f7f7f7;
        z-index: 1;
        .icon-item {
          float: left;
          margin: 4px 2px;
          width: 24px;
          height: 24px;
        }
      }
      .t-i {
        display: none;
        position: absolute;
        left: -10px;
        top: -15px;
        width: 40px;
        height: 15px;
      }
      .t-i::after {
        content: '';
        position: absolute;
        overflow: hidden;
        left: 0;
        top: -14px;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-top: 10px solid #f7f7f7;
        border-bottom: 10px solid transparent;
        z-index: 2;
      }
      .t-i::before {
        content: '';
        position: absolute;
        overflow: hidden;
        left: -1px;
        top: -14px;
        border-right: 11px solid transparent;
        border-left: 11px solid transparent;
        border-top: 11px solid #eee;
        border-bottom: 11px solid transparent;
      }
      .t-open:hover .icon-box, .t-open:hover .t-i {
        display: block;
      }
      .up-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .c-time {
      margin-right: 15px;
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