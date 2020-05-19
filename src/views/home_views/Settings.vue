<template>
  <div class="settings h-100">

    <div class="top-nav clearfix">
      <div class="fl">系统设置</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">安全设置</div>
    </div>

    <div class="container scroll">
      <div class="set-box">
        <div class="no-login" v-if="!status">
          <img src="@/assets/images/no-login.png" class="n-img">
          <div class="tip">还未登录呢 <span @click="toPage({name: 'Login'})">去登录 ></span></div>
        </div>
        <div v-else>
          <div class="top-box">
            <div class="fl avatar-box">
              <div class="avatar"><img class="a-img" :src="userInfo.avatar" ></div>
              <div class="ify-avatar">修改头像</div>
              <div class="up-box">
                <upLoad
                type="image/jpg,image/jpeg,image/png,image/PNG,image/webp,image/gif"
                @upLoad="upLoad">
                </upLoad>
              </div>
            </div>
            <div class="userinfo-box fl">
              <div class="user">登录账号：{{userInfo.nickname}} [<span class="u-c1">您已通过验证</span>]<span class="u-c2">电子邮箱绑定</span></div>
              <div class="user-id">账号ID：{{userInfo.userId}}</div>
              <div class="register-time">注册时间：{{userInfo.createdAt | date}}</div>
            </div>
          </div>
          <div class="list clearfix">
            <div class="l-title fl">我的昵称</div>
            <div class="fl">好的昵称可以让别人快速记住您，可以设置一个2~8个长度的昵称哦</div>
            <div class="fr">
              <span class="g-c"><img class="t-icon" src="@/assets/images/ok.png" >已设置</span>
              <span class="i">|</span>
              <span class="l-ify" @click="open('dialogFormVisible1', 'form1')">修改</span>
            </div>
          </div>
          <div class="list clearfix">
            <div class="l-title fl">登录密码</div>
            <div class="fl">安全性高的密码可以使账号更安全，建议您定期更改密码，设置一个(8-16位)字母、数字、字符各含一个以上的密码</div>
            <div class="fr">
              <span class="g-c"><img class="t-icon" src="@/assets/images/ok.png" >已设置</span>
              <span class="i">|</span>
              <span class="l-ify" @click="open('dialogFormVisible2', 'form2')">修改</span>
            </div>
          </div>
          <div class="list clearfix">
            <div class="l-title fl">找回密码</div>
            <div class="fl">您已绑定邮箱<span class="g-c">{{userInfo.email | showEmail}}</span>[您的邮箱为安全邮箱，可以找回密码]</div>
            <div class="fr">
              <span class="l-ify" @click="open('dialogFormVisible4', 'form4')">密码找回</span>
            </div>
          </div>
          <div class="list clearfix">
            <div class="l-title fl">退出登录</div>
            <div class="fl">如果您使用的不是自己的设备登录，可以进行退出登录</div>
            <div class="fr">
              <span class="l-ify" @click="logout()">退出登录</span>
            </div>
          </div>
          <div class="list clearfix">
            <div class="l-title fl">注销账号</div>
            <div class="fl">如果您不再使用此账号，可以将其注销，账号注销成功后，其下的所有服务、数据及隐私将会被删除且无法恢复，请谨慎操作 <span class="g-c">帮助文档 ></span></div>
            <div class="fr">
              <span class="l-ify" @click="confirm('dialogFormVisible3', 'form3')">注销账号</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="修改昵称" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="昵称" label-width="120">
          <el-input v-model="form1.nickname" autocomplete="off" minlength="2" maxlength="8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="ifyNickname">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="旧密码" label-width="120">
          <el-input show-password v-model="form2.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120">
          <el-input show-password v-model="form2.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120">
          <el-input show-password v-model="form2.password3" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="ifyPassword">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注销账号" :visible.sync="dialogFormVisible3">
      <el-form :model="form3">
        <el-form-item label="验证码" label-width="120">
          <el-input v-model="form3.code" autocomplete="off" maxlength="8"></el-input>
          <el-button style="{float: right; margin-top: 8px;}" :disabled="isDis1" type="primary" @click="getCode('isDis1', 'btnText1', 'userInfo', 'timer1')">{{btnText1}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="deleteAccount">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="找回密码" :visible.sync="dialogFormVisible4">
      <el-form :model="form4">
        <el-form-item label="验证码" label-width="120">
          <el-input v-model="form4.code" autocomplete="off" maxlength="8"></el-input>
          <el-button style="{float: right; margin-top: 8px;}" :disabled="isDis2" type="primary" @click="getCode('isDis2', 'btnText2', 'userInfo', 'timer2')">{{btnText2}}</el-button>
        </el-form-item>
        <el-form-item label="重置密码" label-width="120">
          <el-input show-password v-model="form4.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120">
          <el-input show-password v-model="form4.password2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="findPass">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import upLoad from '@/components/upLoad.vue'
  import { utils } from '@/utils/utils'
  export default {
    name: 'Settings',
    data() {
      return {
        status: false,
        userInfo: {
          avatar: '',
          createdAt: '',
          email: '----',
          nickname: '还没有昵称',
          userId: '----'
        },
        form1: {
          nickname: ''
        },
        dialogFormVisible1: false,
        form2: {
          password1: '',
          password2: '',
          password3: ''
        },
        dialogFormVisible2: false,
        form3: {
          code: ''
        },
        dialogFormVisible3: false,
        dialogFormVisible4: false,
        form4: {
          code: '',
          password1: '',
          password2: ''
        },
        isDis1: false,
        btnText1: '获取验证码',
        isDis2: false,
        btnText2: '获取验证码',
        timer1: null,
        timer2: null
      }
    },
    created() {

      // 获取用户信息
      this.getUserInfo();

    },
    methods: {

      // 获取用户信息
      getUserInfo() {
        this.axios({
          methods: 'get',
          url: '/businessInfo',
          params: {
            isAll: 1
          }
        }).then(res => {
          if (res.data.code !== 1041) {
            this.status = true;
          }
          if (res.data.code === 1050) {
            this.userInfo = res.data.result[0];
          }
        })
      },

      // 找回密码
      findPass() {

        for (let key in this.form4) {
          if (this.form4[key].trim() == '') {
            this.$message({
              message: '表单不能为空！',
              center: true,
              type: 'warning',
              duration: 1500
            });
            return 
          }
        }
        
        let password1 = this.form4.password1.trim();
        if (!utils.vaildReg(password1, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)) {
          this.$message({
            message: '新密码格式不正确（(8-16位)字母、数字、字符各含一个以上）',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return 
        }

        let password2 = this.form4.password2.trim();
        if (password1 !== password2) {
          this.$message({
            message: '两次密码不一致！',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return 
        }

        let data = {
          code: this.form4.code,
          email: this.userInfo.email,
          password: password1
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/findPass',
          data
        }).then(res => {
          if (res.data.code === 1210) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });
            this.dialogFormVisible4 = false;
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

      // 退出登录
      logout() {

        this.$confirm('确定要退出登录吗?', '退出账号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {

          this.axios({
            method: 'post',
            url: '/logout'
          }).then(res => {
            if (res.data.code === 1170) {
              this.$message({
                message: res.data.msg,
                center: true,
                type: 'success',
                duration: 1500
              });

              // 清空token
              utils.clearToken.call(this);
              this.toPage({name: 'Login'});

            }else {
              this.$message({
                message:  res.data.msg,
                center: true,
                type: 'warning',
                duration: 1500
              });
            }
          })

        }).catch(() => {

        })
      },

      // 获取验证码
      getCode(key1, key2, key3, timer) {

        // key1: 禁用属性
        // key2: 按钮文字
        // key3: email
        // timer: 定时器
        this[key1] = true;
        let status = key1 === 'isDis1' ? 2 : 1      // status 1:找回密码 2: 注销账号

        // 发送验证码
        this.axios({
          method: 'post',
          url: '/accountCode',
          data: {
            email: this[key3].email,
            status
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

        let count = 45;
        this[key2] = (count < 10 ? '0' + count : count) + '秒后重新获取';

        this[timer] = setInterval(() => {
          if (count <= 0) {
            clearInterval(this[timer]);
            this[key1] = false;
            this[key2] = '获取验证码';
            return 
          }

          count--;
          this[key2] = (count < 10 ? '0' + count : count) + '秒后重新获取';
        }, 1000)

      },

      // 注销账号
      deleteAccount() {

        let code = this.form3.code.trim();
        if (code == '') {
          this.$message({
            message: '验证码不能为空',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/deleteAccount',
          data: {
            code
          }
        }).then(res => {
          if (res.data.code === 1180) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });

            // 清空token
            utils.clearToken.call(this);
            this.toPage({name: 'Login'});
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

      // 跳转页面
      toPage(path) {
        this.$router.push(path);
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

        let data = {
          type: e.type.split('/')[1],
          base64Url: e.base64Url.split(',')[1]
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/upload',
          data
        }).then(res => {
          if (res.data.code === 1060) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });
            this.userInfo.avatar = res.data.avatar;
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

      // 修改昵称 
      ifyNickname() {

        let nickname = this.form1.nickname.trim();

        if (nickname == '') {
          this.$message({
            message: '昵称不能为空！',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return
        }

        if (nickname.length < 2) {
          this.$message({
            message: '昵称长度不少于2个！',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return
        }

        if (nickname == this.userInfo.nickname) {
          this.$message({
            message: '新昵称与旧昵称一致！',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/ifyNickname',
          data: {
            nickname
          }
        }).then(res => {
          if (res.data.code == 1150) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });
            this.userInfo.nickname = nickname;
            this.dialogFormVisible1 = false;
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

      // 修改密码
      ifyPassword() {

        for (let key in this.form2) {
          if (this.form2[key].trim() == '') {
            this.$message({
              message: '密码不能为空！',
              center: true,
              type: 'warning',
              duration: 1500
            });
            return 
          }
        }
        
        let password2 = this.form2.password2.trim();
        if (!utils.vaildReg(password2, /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)) {
          this.$message({
            message: '新密码格式不正确（(8-16位)字母、数字、字符各含一个以上）',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return 
        }

        let password3 = this.form2.password3.trim();
        if (password2 !== password3) {
          this.$message({
            message: '两次密码不一致！',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return 
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/ifyPassword',
          data: {
            oldPass: this.form2.password1.trim(),
            newPass: password2
          }
        }).then(res => {
          if (res.data.code === 1160) {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });
            this.dialogFormVisible2 = false;
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

      open(key1, key2) {

        for (let key in this[key2]) {
          this[key2][key] = '';
        }

        this[key1] = true;

      },

      confirm(key1, key2) {
        this.$confirm('此操作不可逆, 是否继续?', '注销账号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {

          this.open(key1, key2);

        }).catch(() => {

        })
      }

    },
    components: {
      upLoad
    },
    filters: {
      date(v) {
        let date = new Date(v);
        return utils.handleDate(date, '-') + ' ' + utils.handleTime(date, ':');
      },

      showEmail(v) {
        return v.replace(/(.{3}).{4}(.?)/, '$1****$2')
      }
    }

  }
</script>

<style lang="less" scoped>

  .container {
    height: calc(100% - 101px);
    padding: 10px 15px 35px;
    margin-top: 10px;
    overflow-y: auto;
    .set-box {
      padding: 35px 15px;
      border-radius: 12px;
      background: #fff;
      .top-box {
        height: 150px;
        padding: 10px 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .avatar-box {
          position: relative;
        }
        .up-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .avatar {
          height: 120px;
          width: 120px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          .a-img {
            display: block;
            width: 100%;
            min-height: 100%;
          }
        }
        .ify-avatar {
          text-align: center;
          line-height: 45px;
          color: #007aff;
          cursor: pointer;
        }
        .userinfo-box {
          margin-left: 30px;
          margin-top: 14px;
          line-height: 32px;
          .u-c1, .u-c2 {
            cursor: pointer;
          }
          .u-c1 {
            color: #ff9900;
          }
          .u-c2 {
            margin-left: 5px;
            color: #007aff;
          }
        }
      }
      .list {
        padding: 30px;
        border-bottom: 1px dotted #ddd;
        color: #444;
        .g-c {
          color: #009900;
          cursor: pointer;
        }
        .l-title {
          margin-right: 70px;
          font-weight: 700;
        }
        .t-icon {
          width: 22px;
          height: 22px;
          vertical-align: -5px;
          margin-right: 8px;
        }
        .i {
          margin-left: 6px;
          margin-right: 6px;
          color: #666;
        }
        .l-ify {
          color: #007aff;
          cursor: pointer;
        }
      }
    }
    .no-login {
      padding: 100px 0;
      .n-img {
        display: block;
        width: 320px;
        margin: 0 auto 40px;
      }
      .tip {
        text-align: center;
        span {
          font-size: 16px;
          font-weight: 700;
          color: #007aff;
          cursor: pointer;
        }
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