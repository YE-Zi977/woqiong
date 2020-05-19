<template>
  <div class="login h-100">

    <div class="main-bg h-100">

      <!-- 头部 -->
      <div class="header clearfix">
        <div class="logo-box fl">
          <img class="auto-img" src="@/assets/images/logo.png" alt="logo">
        </div>
        <div class="title fl">无穷影院 | 商家后台管理系统</div>
      </div>
      
      <!-- 主体 -->
      <div class="main">

        <!-- 头部 -->
        <div class="top">
          尊敬的用户，{{welcomeText}}呀~
        </div>

        <!-- 表单盒子 -->
        <div class="from-box">
          <div class="nav">
            <div @click="toggle(item)" class="nav-item" :class="item.isActive ? 'active' : ''" v-for="(item, index) in tabList" :key="index">{{item.title}}</div>
            <div class="line" :style="lineStyle"></div>
          </div>
          <div class="input-box">

            <div v-show="loginInfo.isShow" class="tab-item">
              <div class="info-box clearfix">
                <div class="title fl">邮箱</div>
                <div class="info fl">
                  <el-input @blur="vaildForm('email', /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/)" v-model="loginInfo.email.value" placeholder="请输入邮箱"></el-input>
                  <div v-show="loginInfo.email.isError" class="tip">
                    邮箱格式错误！
                  </div>
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title fl">密码</div>
                <div class="info fl">
                  <el-input @blur="vaildForm('password', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)" placeholder="请输入密码" v-model="loginInfo.password.value" show-password></el-input>
                  <div v-show="loginInfo.password.isError" class="tip">
                    (8-16位)字母、数字、字符各含一个以上！
                  </div>
                </div>
              </div>
              <div class="slider-desc">滑动验证</div>
              <div v-if="!slider.isPass" class="slider-box" @mousemove="move" @mouseup="end" @mouseleave="end">
                <div class="slider" :style="{width: slider.width + 'px'}"></div>
                <div class="s-btn" :style="{left: slider.left + 'px'}" @mousedown="start"></div>
              </div>
              <div v-else class="pass clearfix">
                <div class="pass-img-box fl">
                  <img class="auto-img" src="@/assets/images/pass.png" />
                </div>
                <div class="pass-text fl">恭喜你，验证通过！</div>
              </div>
            </div>
            <div v-show="registerInfo.isShow" class="tab-item">
              <div class="info-box clearfix">
                <div class="title fl">邮箱</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('email', /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/)" v-model="registerInfo.email.value" placeholder="请输入邮箱"></el-input>
                  <div v-show="registerInfo.email.isError" class="tip">
                    邮箱格式错误！
                  </div>
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title get-code fl">验证码</div>
                <div class="code-box fl">
                  <el-input @blur="vaildForm('code', /^[0-9]{6}$/)" v-model="registerInfo.code.value" placeholder="请输入验证码"></el-input>
                </div>
                <div class="get-btn fr">
                  <el-button @click="getCode('registerInfo')" class="btn" type="primary" round>{{registerInfo.code.text}}</el-button>
                </div>
                <div v-show="registerInfo.code.isError" class="tip">
                  验证码错误！
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title fl">密码</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('password1', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)" placeholder="请输入密码" v-model="registerInfo.password1.value" show-password></el-input>
                  <div v-show="registerInfo.password1.isError" class="tip">
                    (8-16位)字母、数字、字符各含一个以上！
                  </div>
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title fl">确认密码</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('password2', '^' + registerInfo.password1.value + '$')" placeholder="请再次确认密码" v-model="registerInfo.password2.value" show-password></el-input>
                  <div v-show="registerInfo.password2.isError" class="tip">
                    两次密码不一致！
                  </div>
                </div>
              </div>
            </div>
            <div v-show="retrieveInfo.isShow" class="tab-item">
              <div class="info-box clearfix">
                <div class="title fl">邮箱</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('email', /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/)" v-model="retrieveInfo.email.value" placeholder="请输入邮箱"></el-input>
                  <div v-show="retrieveInfo.email.isError" class="tip">
                    邮箱格式错误！
                  </div>
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title get-code fl">验证码</div>
                <div class="code-box fl">
                  <el-input @blur="vaildForm('code', /^[0-9]{6}$/)" v-model="retrieveInfo.code.value" placeholder="请输入验证码"></el-input>
                </div>
                <div class="get-btn fr">
                  <el-button @click="getCode('retrieveInfo')" class="btn" type="primary" round>{{retrieveInfo.code.text}}</el-button>
                </div>
                <div v-show="retrieveInfo.code.isError" class="tip">
                  验证码错误！
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title fl">重置密码</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('password1', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)" placeholder="请输入密码" v-model="retrieveInfo.password1.value" show-password></el-input>
                  <div v-show="retrieveInfo.password1.isError" class="tip">
                    (8-16位)字母、数字、字符各含一个以上！
                  </div>
                </div>
              </div>
              <div class="info-box clearfix">
                <div class="title fl">确认密码</div>
                <div class="info r-w fr">
                  <el-input @blur="vaildForm('password2', '^' + retrieveInfo.password1.value + '$')" placeholder="请再次确认密码" v-model="retrieveInfo.password2.value" show-password></el-input>
                  <div v-show="retrieveInfo.password2.isError" class="tip">
                    两次密码不一致！
                  </div>
                </div>
              </div>
            </div>

            <div class="pass-btn">
              <el-button @click="submit" class="btn" type="primary" round>{{btnText}}</el-button>
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
    name: 'Login',
    data() {
      return {
        // tab
        tabList: [
          {btnDesc: '确认登录', type: 'login',title: '登录', isActive: true, width: 32, left: 100},
          {btnDesc: '确认注册', type: 'register',title: '注册', isActive: false, width: 32, left: 356},
          {btnDesc: '确认找回', type: 'retrieve',title: '找回密码', isActive: false, width: 64, left: 612}
        ],
        lineStyle: {
          width: '52px',
          left: '100px'
        },
        loginInfo: {
          isShow: true,
          email: {
            isError: false,
            value: ''
          },
          password: {
            isError: false,
            value: ''
          }
        },
        registerInfo: {
          isShow: false,
          email: {
            isError: false,
            value: ''
          },
          code: {
            isError: false,
            value: '',
            disable: false,
            text: '获取验证码'
          },
          password1: {
            isError: false,
            value: ''
          },
          password2: {
            isError: false,
            value: ''
          }
        },
        retrieveInfo: {
          isShow: false,
          email: {
            isError: false,
            value: ''
          },
          code: {
            isError: false,
            value: '',
            disable: false,
            text: '获取验证码'
          },
          password1: {
            isError: false,
            value: ''
          },
          password2: {
            isError: false,
            value: ''
          }
        },
        currentModule: 'loginInfo',

        // 滑块验证
        slider: {
          width: 0,
          left: -10,
          m_left: 0,
          isMove: false,
          isPass: false
        },

        // 欢迎文本
        welcomeText: '早上好',

        // 按钮文本
        btnText: '确认登录'

      }
    },
    created() {

      // 设置欢迎语
      let currentTime = new Date();
      let hour = currentTime.getHours();

      if (hour >= 5 && hour <= 9) {
        this.welcomeText = '早上好';

      }else if (hour >= 10 && hour <= 12) {
        this.welcomeText = '中午好';

      }else if (hour >= 13 && hour <= 18) {
        this.welcomeText = '下午好';

      }else {
        this.welcomeText = '晚上好';

      }

    },
    methods: {
      // 切换
      toggle(item) {
        if (item.isActive) {
          return;
        }

        this.lineStyle.width = item.width + 20 +'px';
        this.lineStyle.left = item.left +'px';

        for (let i = 0; i < this.tabList.length; i++) {
          if (this.tabList[i].isActive) {
            this.tabList[i].isActive = false;

            let type = this.tabList[i].type + 'Info';
            this[type].isShow = false;

            // 切换后重置表单
            this.reForm(type);

            break;
          }
        }
        item.isActive = true;
        this.currentModule = item.type + 'Info';
        this.btnText = item.btnDesc;
        this[item.type + 'Info'].isShow = true;
      },

      // 重置表单
      reForm(type) {
        let temp = this[type];

        for (let key in temp) {
          if (key != 'isShow') {
            temp[key].isError = false;
            temp[key].value = '';
          }
        }

        if (type === 'loginInfo') {
          
          this.slider = {
            width: 0,
            left: -10,
            m_left: 0,
            isMove: false,
            isPass: false
          }
        }

      },

      // 验证表单
      vaildForm(key, reg) {

        let value = this[this.currentModule][key].value;

        if (key == 'password1') {
          if (value != this[this.currentModule].password2.value) {

            this[this.currentModule].password2.isError = true;
          }else {
            this[this.currentModule].password2.isError = false;
          }
        }

        if (!utils.vaildReg(value, reg)) {

          this[this.currentModule][key].isError = true;
        }else {

          this[this.currentModule][key].isError = false;
        }

      },

      // 获取验证码
      getCode(key) {
        
        // 获取验证码被禁用，直接return
        if (this[key].code.disable) {
          return;
        }

        if (this[key].email.value == '' || this[key].email.isError) {
          
          // 判断邮箱是否合法
          this.$message({
            message: '请输入正确的邮箱',
            type: 'warning',
            center: true,
            duration: 1500
          })

          return;
        }

        // 否则 禁用45秒
        this[key].code.disable = true;

        let time = 45;
        this[key].code.text = (time < 10 ? '0' + time : time) + '秒后重新获取';
        let timer = setInterval(() => {

          if (time === 0) {
            this[key].code.disable = false;
            this[key].code.text = '获取验证码';
            clearInterval(timer);
            return;
          }

          this[key].code.text = (--time < 10 ? '0' + time : time) + '秒后重新获取';

        }, 1000)

        if (this.currentModule == 'retrieveInfo') {

          // 发送验证码
          this.axios({
            method: 'post',
            url: '/accountCode',
            data: {
              email: this[key].email.value,
              status: 1
            }
          }).then(res =>{
            if (res.data.code === 1190) {
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

          return;
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/sendCode',
          data: {
            email: this[key].email.value
          }
        })
        .then(res => {
          
          if (res.data.code === 1010) {
            // 发送验证码成功
            this.$message({
              message: '发送验证码成功， 请注意查收',
              type: 'success',
              center: true,
              duration: 1500
            })
          }else {

            this.$message({
              message: res.data.msg,
              type: 'error',
              center: true,
              duration: 1500
            })
          }

        })

      },

      // 提交
      submit() {

        if (this.submitVaild(this.currentModule)) {

          if (this.currentModule == 'loginInfo' && !this.slider.isPass) {

            // 提示完成滑动验证
            this.$message({
              message: '请完成滑动验证',
              type: 'warning',
              center: true,
              duration: 1500
            });
            console.log('不通过...');

            return;
          }

          console.log('通过...');

          // 发起请求
          let url = '/' + this.currentModule.slice(0, -4);
          if (this.currentModule == 'retrieveInfo') {
            url = '/findPass';
          }

          // 请求参数
          let data = {};
          if (this.currentModule == 'loginInfo') {
            data = {
              email: this[this.currentModule].email.value,
              password: this[this.currentModule].password.value
            }
          }else {
            data = {
              email: this[this.currentModule].email.value,
              password: this[this.currentModule].password1.value,
              code: this[this.currentModule].code.value
            }
          }

          this.axios({
            method: 'post',
            url,
            data
          })
          .then(res => {

            // 重置表单
            this.reForm(this.currentModule);
            
            if (res.data.code === 1000 || res.data.code === 1020 || res.data.code === 1210) {
              // 提示成功
              this.$message({
                message: '恭喜你，' + res.data.msg,
                type: 'success',
                center: true,
                duration: 1500
              });

              if (this.currentModule == 'loginInfo') {

                // 清空token
                utils.clearToken.call(this);

                // 设置cookies
                let token = res.data.token.split('.');
                token.forEach((v, i) => {
                  this.$cookies.set('w' + i, v, 10 * 24 * 60 * 60);
                })

                // 跳转
                this.$router.push({name: 'MovieList'});

              }else {
                this.toggle(this.tabList[0]);
              }

            }else {
              this.$message({
                message: res.data.msg,
                type: 'error',
                center: true,
                duration: 1500
              });
            }
          })

        }else {

          console.log('不通过...');

          this.$message({
            message: '请正确填写表单',
            type: 'warning',
            center: true,
            duration: 1500
          });
        }

      },

      // 提交验证
      submitVaild(type) {

        let flag = true;
        for (let key in this[type]) {

          if (key != 'isShow' && (this[type][key].value == '' || this[type][key].isError)) {
            flag = false;
          }

        }
        return flag
      },

      // 滑动验证
      start(e) {

        this.slider.isMove = true;
        this.slider.m_left = e.pageX;

      },
      move(e) {

        if (!this.slider.isMove) {
          return;
        }

        let left = e.pageX;
        let temp = left - this.slider.m_left + this.slider.left;
        this.slider.m_left = left;
        temp = temp <= -10 ? -10 : temp >= 430 ? 430 : temp;

        this.slider.left = temp;
        this.slider.width = temp + 10;
      },
      end(e) {

        if (!this.slider.isMove) {
          return;
        }
        
        this.slider.isMove = false;
        
        if (this.slider.left >= 415) {
          // 验证通过
          this.slider.isPass = true;
          this.slider.left = 430;
          this.slider.width = 440;
        }
      }

    }
  }
</script>

<style lang="less" scoped>

  .from-box {
    .nav {
      position: relative;
      display: flex;
      justify-content: space-around;
      height: 50px;
      .nav-item {
        height: 100%;
        padding: 0 10px;
        line-height: 50px;
        cursor: pointer;
      }
      .nav-item:hover, .nav-item.active {
        color: rgb(0, 122, 255);
      }
      .line {
        position: absolute;
        bottom: 0;
        left: 612px;
        height: 3px;
        width: 84px;
        border-radius: 1px;
        background: rgb(0, 122, 255);
        transition: left .2s ease-out;
      }
    }
    .tip {
      position: absolute;
      right: -140px;
      top: 50%;
      transform: translateY(-50%);
      width: 125px;
      color: #f00;
      font-size: 12px;
      line-height: 18px;
    }
    .input-box {
      width: 440px;
      height: 320px;
      margin: 30px auto 0;
      .info-box {
        position: relative;
        margin-bottom: 15px;
      }
      .title {
        margin-right: 15px;
        line-height: 42px;
        font-size: 14px;
      }
      .title.get-code {
        margin-right: 29px;
      }
      .info {
        position: relative;
        width: calc(100% - 43px);
       
      }
      .info.r-w {
        width: calc(100% - 71px);
      }
      .slider-desc {
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 14px;
      }
      .slider-box {
        position: relative;
        height: 26px;
        margin-bottom: 39px;
        background: rgba(0, 0, 0, .55);
        .slider {
          width: 30px;
          height: 100%;
          background: rgb(0, 122, 255);
        }
        .s-btn {
          width: 20px;
          height: 30px;
          position: absolute;
          top: -2px;
          left: 20px;
          background: #eee;
          cursor: pointer;
        }
      }
      .btn {
        background: rgb(0, 122, 255);
        border: 1px solid rgb(0, 122, 255);
      }
      .btn:active {
        background: rgb(3, 90, 182);
      }
      .get-btn>.btn.disable {
        background: #eee;
        color: #999;
        border: 1px solid #999;
      }
      
      .pass-btn {
        margin: 0 45px;
        padding-top: 36px;
        .btn {
          width: 100%;
          color: #fff;
        }
      }
    }
    .pass {
      height: 65px;
      .pass-img-box {
        width: 32px;
        height: 32px;
        margin: 16px 15px 0;
      }
      .pass-text {
        line-height: 65px;
      }
    }
  }
  .top {
    padding-bottom: 20px;
    padding-top: 10px;
    font-size: 20px;
    text-align: center;
    border-bottom: 2px solid rgb(8, 15, 40);
  }
  .header {
    height: 60px;
    padding: 30px 45px;
    font-size: 30px;
    line-height: 80px;
    color: rgb(8, 15, 40);
    .logo-box {
      height: 100%;
      width: 60px;
      padding: 12px;
      border-radius: 50%;
      margin-right: 15px;
      background: rgba(8, 15, 40);
    }
  }
  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 800px;
    height: 460px;
    padding: 12px;
    margin: auto;
    border-radius: 12px;
    background: rgba(0, 0, 0, .35);
    color: #fff;
  }
  .main-bg::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url('../assets/images/main_bg.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    z-index: -1;
  }

  .main-bg {
    position: relative;
    height: 100%;
    min-width: 1200px;
    min-height: 740px;
    background: rgba(75, 96, 132, 0.85);
  }
</style>