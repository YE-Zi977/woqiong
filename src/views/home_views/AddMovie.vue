<template>
  <div class="add-movie h-100">

    <div class="top-nav clearfix">
      <div class="fl">电影管理</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">发布电影</div>
    </div>

    <div class="container scroll">
      <div class="form-box">
        <div class="f-item flex">
          <div class="f-title">电影名称</div>
          <div class="input-box">
            <el-input @blur="validForm('name', /[<>&\|']+/g)" maxlength="20" show-word-limit v-model="movieInfo.name.value" placeholder="请输入电影名称"></el-input>
            <div v-show="movieInfo.name.isError" class="tip">{{movieInfo.name.msg}}</div>
          </div>
        </div>
        <div class="f-long f-item flex">
          <div class="f-title">电影英文名称</div>
          <div class="input-box">
            <el-input @blur="validForm('enName', /[<>&\|']+/g, true)" maxlength="40" show-word-limit v-model="movieInfo.enName.value" placeholder="请输入电影英文名称"></el-input>
            <div v-show="movieInfo.enName.isError" class="tip">{{movieInfo.enName.msg}}</div>
          </div>
        </div>
        <div class="director-list clearfix">
          <div class="director-item" v-for="(item, index) in movieInfo.directorList" :key="index">{{item}}<div class="d-close" @click="remove('directorList', index)"><i class="el-icon-close"></i></div></div>
        </div>
        <div class="f-item flex">
          <div class="f-title">添加导演</div>
          <div class="input-box">
            <div class="add-director" @click="add('directorList', 'directorName')"><el-button type="primary" size="mini" icon="el-icon-plus" circle></el-button></div>
            <el-input v-model="directorName" placeholder="请输入导演名字" maxlength="40"></el-input>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">电影时长</div>
          <div class="input-box f-small-box">
            <div class="small-input"><el-input @blur="validTime('hour', /^[0-2]?[0-4]$/)" v-model="movieInfo.time.hour.value" placeholder="时" maxlength="2"></el-input></div>
            <div>:</div>
            <div class="small-input"><el-input @blur="validTime('minute', /^[0-5]?[0-9]$/)" v-model="movieInfo.time.minute.value" placeholder="分" maxlength="2"></el-input></div>
            <div>:</div>
            <div class="small-input"><el-input @blur="validTime('second', /^[0-5]?[0-9]$/)" v-model="movieInfo.time.second.value" placeholder="秒" maxlength="2"></el-input></div>
            <div v-show="movieInfo.time.isError" class="tip">{{movieInfo.time.msg}}</div>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">电影类型</div>
          <div class="input-box">
            <el-select class="w-100" v-model="movieInfo.type" placeholder="请选择电影类型" multiple collapse-tags>
              <el-option value="爱情">爱情</el-option>
              <el-option value="喜剧">喜剧</el-option>
              <el-option value="动作">动作</el-option>
              <el-option value="剧情">剧情</el-option>
              <el-option value="科幻">科幻</el-option>
              <el-option value="恐怖">恐怖</el-option>
              <el-option value="动画">动画</el-option>
              <el-option value="惊悚">惊悚</el-option>
              <el-option value="犯罪">犯罪</el-option>
              <el-option value="其它">其它</el-option>
            </el-select>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">电影模式</div>
          <div class="input-box">
            <el-select class="w-100" v-model="movieInfo.mode" placeholder="请选择电影模式">
              <el-option value="2D">2D</el-option>
              <el-option value="3D">3D</el-option>
              <el-option value="5D">5D</el-option>
            </el-select>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">上映日期</div>
          <div class="input-box">
            <el-date-picker
              class="w-100"
              v-model="movieInfo.date"
              type="date"
              placeholder="请选择上映日期">
            </el-date-picker>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">电影简介</div>
          <div class="input-box">
            <el-input
              type="textarea"
               @blur="validForm('desc', /[<>&\|']+/g, true)"
              :autosize="{minRows: 2, maxRows: 22}"
              resize="none"
              placeholder="请输入电影简介"
              v-model="movieInfo.desc.value"
              maxlength="400"
              show-word-limit>
            </el-input>
            <div v-show="movieInfo.desc.isError" class="tip">{{movieInfo.desc.msg}}</div>
          </div>
        </div>
        <div class="img-pro clearfix">
          <div class="img-pro-item" v-for="(item, index) in movieInfo.coverPhoto" :key="index">
            <div class="clack-box">
              <div class="close" @click="remove('coverPhoto', index)"><i class="el-icon-delete"></i></div>
            </div>
            <img class="img-pro-box" :src="item.base64Url || item.imgUrl">
          </div>
        </div>
        <div class="up-item flex">
          <div class="up-title">添加封面</div>
          <div class="up-box">
            <upLoad
            type="image/jpg,image/jpeg,image/png,image/PNG,image/webp,image/gif"
            @upLoad="upLoad($event, 'coverPhoto')"
            :disable="movieInfo.coverPhoto.length >= 3">
            </upLoad>
          </div>
        </div>
        <div class="img-pro p-20 clearfix">
          <div class="actor-img-item" v-for="(item, index) in movieInfo.actorList" :key="index">
            <div class="clack-box">
              <div class="close" @click="remove('actorList', index)"><i class="el-icon-delete"></i></div>
            </div>
            <img class="img-pro-box" :src="item.imgUrl || item.file.base64Url">
            <div class="actor-name overflow">{{item.value || item.name}}</div>
          </div>
        </div>
        <div class="f-item flex">
          <div class="f-title">添加演员</div>
          <div class="input-box">
            <div class="add-director" @click="add('actorList', 'actor')"><el-button type="primary" size="mini" icon="el-icon-plus" circle></el-button></div>
            <el-input placeholder="请输入导演名字" v-model="actor.value" maxlength="20">
              <template slot="prepend">
                添加图片
                <div class="actor-upload-box">
                  <upLoad
                  type="image/jpg,image/jpeg,image/png,image/PNG,image/webp,image/gif"
                  @upLoad="upLoad($event, 'actor')"
                  :disable="movieInfo.actorList.length >= 9">
                  </upLoad>
                </div>
              </template>
            </el-input>
          </div>
        </div>
        <div class="submit-box">
          <el-button @click="submit" type="primary" plain>{{isEdit ? '保存编辑' : '发布电影'}}</el-button>
          <el-button class="re-btn" @click="reForm" type="info" plain>{{isEdit ? '取消编辑' : '重置'}}</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  // 导入上传组件
  import upLoad from '@/components/upLoad.vue';
  import { utils } from '@/utils/utils'

  export default {
    name: 'AddMovie',
    data() {
      return {
        movieInfo: {
          name: {
            value: '',
            isError: false,
            msg: ''
          },
          enName: {
            value: '',
            isError: false,
            msg: ''
          },
          directorList: [],
          actorList: [],
          type: null,
          time: {
            value: '',
            isError: false,
            msg: '',
            hour: {
              value: '0',
              isError: false,
              msg: '小时格式不正确，不能超过24的整数'
            },
            minute: {
              value: '0',
              isError: false,
              msg: '分钟格式不正确，不能超过59的整数'
            },
            second: {
              value: '0',
              isError: false,
              msg: '秒数格式不正确，不能超过59的整数'
            }
          },
          mode: '',
          date: null,
          desc: {
            value: '',
            isError: false,
            msg: ''
          },
          coverPhoto: []
        },

        // 导演名
        directorName: '',
        // 演员
        actor: {
          value: '',
          file: null
        },

        isEdit: false,
        tempInfo: [],
        removeActor: [],
        removeCover: []
      }
    },
    created() {

      // 判断是否为编辑状态
      this.isEdit = this.$route.params.isEdit === true;
     
      // 如果是
      if (this.isEdit) {

        let movieId = this.$route.params.movieId;
        // 发起请求
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
            
            this.tempInfo = res.data.result[0];

            let keys = ['name', 'enName', 'desc', 'time'];
            keys.forEach(v => {
              this.movieInfo[v].value = this.tempInfo[v];
            })

            this.movieInfo.mode = this.tempInfo.mode;
            this.movieInfo.date = new Date(this.tempInfo.date);
            this.movieInfo.coverPhoto = this.tempInfo.coverList.concat();
            this.movieInfo.actorList = this.tempInfo.actorList.concat();

            keys = ['director', 'type'];
            keys.forEach(v => {
              let key = v === 'type' ? v : v + 'List';
              this.movieInfo[key] = this.tempInfo[v].split(',');
            })

            keys = ['hour', 'minute', 'second'];
            let time = this.tempInfo.time.split(':');
            keys.forEach((v, i) => {
              this.movieInfo.time[v].value = time[i];
            })

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

     }

    },
    methods: {
      // 上传文件
      upLoad(e, key) {
        
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

        if (key == 'actor') {
          this[key].file = file;
          return;
        }
        
        this.movieInfo[key].push(file);
      },

      // 表单验证
      validForm(key, reg, isNull) {

        if (this.movieInfo[key].value.trim() == '' && !isNull) {
          this.movieInfo[key].isError = true;
          this.movieInfo[key].msg = '必填内容不能为空';
          return;
        }

        if (utils.vaildReg(this.movieInfo[key].value, reg)) {
          this.movieInfo[key].isError = true;
          this.movieInfo[key].msg = '不能包含 <、>、&、/、\'、| 非法字符';
        }else {
          this.movieInfo[key].isError = false;
          this.movieInfo[key].value = this.movieInfo[key].value.trim();
        }

      },

      // 时长表单验证
      validTime(key, reg) {

        if (this.movieInfo.time[key].value.trim() == '') {
          this.movieInfo.time[key].value = '0';
        }

        if (!utils.vaildReg(this.movieInfo.time[key].value, reg)) {
          this.movieInfo.time[key].isError = true;
          this.movieInfo.time.isError = true;
          this.movieInfo.time.msg = this.movieInfo.time[key].msg;
          return;
        }

        this.movieInfo.time[key].isError = false;

        let flag = true;
        for (let key in this.movieInfo.time) {
          if (this.movieInfo.time[key].isError) {
            flag = false;
            this.movieInfo.time.isError = true;
            this.movieInfo.time.msg = this.movieInfo.time[key].msg;
          }
        }
        if (flag) {
          this.movieInfo.time.value = this.movieInfo.time.hour.value + this.movieInfo.time.minute.value + this.movieInfo.time.second.value;
          
          if (parseInt(this.movieInfo.time.value) == 0) {
            this.movieInfo.time.isError = true;
            this.movieInfo.time.msg = '时长不能为 0';
            return;
          }

          let time = this.movieInfo.time
          this.movieInfo.time.value = (time.hour.value.length <= 1 ? '0' + time.hour.value : time.hour.value) + ':' +
                                      (time.minute.value.length <= 1 ? '0' + time.minute.value : time.minute.value) + ':' +
                                      (time.second.value.length <= 1 ? '0' + time.second.value : time.second.value);
          this.movieInfo.time.isError = false;
        }

      },

      // 删除
      remove(key, index) {
        
        if (this.isEdit && this.movieInfo[key][index].imgUrl) {
          if (key === 'coverPhoto') {
            this.removeCover.push(this.movieInfo[key][index]);
          }else {
            this.removeActor.push(this.movieInfo[key][index]);
          }
        }

        this.movieInfo[key].splice(index, 1);
      },

      // 添加
      add(key, valueKey) {

        if (key == 'actorList' && !this[valueKey].file) {
          this.$message({
            message: '请选择一张演员图片哦',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }

        let value = key == 'actorList' ? this[valueKey].value : this[valueKey];

        if (value.trim() == '') {
          this.$message({
            message: '内容不能为空哦',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }

        if (utils.vaildReg(value, /[<>&\|']+/g)) {
          this.$message({
            message: '不能包含 <、>、&、/、\'、| 非法字符',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        
        if (key == 'actorList') {
          
          this.movieInfo[key].push({value : value.trim(), file: this[valueKey].file});
          this[valueKey].value = '';
        }else {

          this.movieInfo[key].push(value.trim());
          this[valueKey] = '';
        }

      },

      // 重置表单
      reForm() {
        
        this.directorName = '';
        this.actor.value = '';
        this.actor.file = null;

        let keys1 = ['name', 'enName', 'time', 'desc'];
        keys1.forEach(v => {
          this.movieInfo[v].value = '';
          this.movieInfo[v].isError = false;
          this.movieInfo[v].msg = '';
        })

        let keys2 = [
          {key: 'hour', msg: '小时格式不正确，不能超过24的整数'},
          {key: 'minute', msg: '分钟格式不正确，不能超过59的整数'},
          {key: 'second', msg: '秒数格式不正确，不能超过59的整数'},
        ];
        keys2.forEach(v => {
          this.movieInfo.time[v.key].value = '0';
          this.movieInfo.time[v.key].isError = false;
          this.movieInfo.time[v.key].msg = v.msg;
        })

        let keys3 = ['directorList', 'actorList', 'coverPhoto'];
        keys3.forEach(v => {
          this.movieInfo[v] = [];
        })

        this.movieInfo.type = null;
        this.movieInfo.mode = '';
        this.movieInfo.date = null;

        if (this.isEdit) {
          this.$router.push({name: 'MovieList'})
        }

      },

      // 提交
      submit() {

        // 表单数据
        let formData = this.movieInfo;

        // 上传的数据
        let data = {};
        data.movieInfo = {};
        
        // 电影名称
        if (formData.name.value == '' || formData.name.isError) {
          this.$message({
            message: '请正确填写电影名称',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.name = formData.name.value;

        // 电影英文名称 可以为空
        if (formData.enName.isError) {
          this.$message({
            message: '请正确填写电影英文名称',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.enName = formData.enName.value;

        // 电影导演名单
        if (formData.directorList.length <= 0) {
          this.$message({
            message: '请至少添加一个导演',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.director = formData.directorList.join(',');

        // 电影时长
        if (formData.time.value == '' || formData.time.isError) {
          this.$message({
            message: '请正确填写电影时长',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.time = formData.time.value;

        // 电影类型
        if (formData.type.length <= 0) {
          this.$message({
            message: '请至少选择一个电影类型',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.type = formData.type.join(',');

        // 电影模式
        if (formData.mode == '') {
          this.$message({
            message: '请选择电影模式',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.mode = formData.mode;

        // 上映日期
        if (formData.date == null) {
          this.$message({
            message: '请选择电影上映日期',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.date = new Date(formData.date).toLocaleDateString().replace(/\//g, '-');

        // 电影简介 可以为空
        if (formData.desc.isError) {
          this.$message({
            message: '请正确填写电影简介',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.movieInfo.desc = formData.desc.value;

        // 电影封面
        if (formData.coverPhoto.length <= 0) {
          this.$message({
            message: '请至少添加一个电影封面',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.coverPhoto = [];
        formData.coverPhoto.forEach(v => {
          if (v.type) {
            data.coverPhoto.push({base64Url: v.base64Url.split(',')[1], type: v.type.split('/')[1]});

          }
        })

        // 演员列表
        if (formData.actorList.length <= 0) {
          this.$message({
            message: '请至少添加一个电影演员',
            center: true,
            type: 'warning',
            duration: 1500
          });
          return;
        }
        data.actorList = [];
        formData.actorList.forEach(v => {
          if (v.file) {

            data.actorList.push({name: v.value, base64Url: v.file.base64Url.split(',')[1], type: v.file.type.split('/')[1]});
          }
        })

        if (this.isEdit) {

          let movieInfo = {};
          for (let key in data.movieInfo) {

            if ((data.movieInfo[key] != this.tempInfo[key]) && key != 'date') {

              movieInfo[key] = data.movieInfo[key];

            } 

            if (key == 'date' && data.movieInfo[key] != new Date(this.tempInfo.date).toLocaleDateString().replace(/\//g, '-')) {

              movieInfo[key] = data.movieInfo[key];

            }

          }

          let upData = {
            movieInfo,
            movieId: this.tempInfo.movieId,
            coverList: data.coverPhoto.concat(),
            actorList: data.actorList.concat(),
            removeActor: this.removeActor.concat(),
            removeCover: this.removeCover.concat()
          }

          // json化参数
          let flag = true;
          for (let key in upData) {
            if (key != 'movieId') {

              upData[key] = JSON.stringify(upData[key]);

              if (upData[key] !== '[]' && upData[key] !== '{}') {
                flag = false;
              }else {
                delete upData[key];
              }

            }
          }

          if (flag) {
            this.$message({
              message: '数据无更改',
              center: true,
              type: 'warning',
              duration: 1500
            });
            return;
          }

          // 发起请求

          this.axios({
            method: 'post',
            url: '/editMovie',
            data: upData
          }).then(res => {
            if (res.data.code === 1090) {
              this.$message({
                message: '编辑成功',
                center: true,
                type: 'success',
                duration: 1500
              });

              // 重置
              this.reForm();
            }
          })
          
          return;
        }

        // 如果是发布电影 执行下面

        // json化参数

        for (let key in data) {
          data[key] = JSON.stringify(data[key]);
        }

        // 发起请求
        this.axios({
          method: 'post',
          url: '/releaseMovie',
          data
        }).then(res => {
          
          if (res.data.code === 1070) {
            this.$message({
              message: '发布成功',
              center: true,
              type: 'success',
              duration: 1500
            });

            // 重置
            this.reForm();
          }else {
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'warning',
              duration: 1500
            });
            }
        })


      }
    },
    // 注册组件
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
    .form-box {
      padding-top: 35px;
      padding-left: 60px;
      border-radius: 12px;
      background: #fff;
      .p-20 {
        padding: 20px 0 12px;
      }
      .actor-upload-box {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 97px;
        opacity: 0;
      }
      .submit-box {
        padding: 15px 0 50px;
        .re-btn {
          margin-left: 25px;
        }
      }
      .director-list {
        width: 350px;
        margin-left: 71px;
        margin-bottom: 15px;
        .director-item {
          position: relative;
          float: left;
          max-width: calc(100% - 34px);
          margin: 0 5px 5px;
          padding: 3px 12px;
          border-radius: 14px;
          background: rgba(0, 0, 0, .15);
          .d-close {
            display: none;
            position: absolute;
            top: -6px;
            right: -6px;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            border-radius: 50%;
            background: rgba(230, 162, 60, .55);
            color: #fff;
            cursor: pointer;
          }
        }
        .director-item:hover .d-close {
          display: block;
        }
      }
      .img-pro {
        width: 350px;
        margin-left: 71px;
        .actor-img-item {
          position: relative;
          float: left;
          width: calc(100% / 3 - 10px); 
          margin-right: 15px;
          margin-bottom: 8px;
          overflow: hidden;
          cursor: pointer;
          box-sizing: border-box;
          .clack-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.55);
            .close {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
            }
          }
          .img-pro-box {
            width: 55px;
            height: 77px;
            margin: 0 auto 4px;
            display: block;
            box-sizing: border-box;
            border: 1px solid #eee;
            border-radius: 4px;
          }
          .actor-name {
            text-align: center;
          }
        }
        .actor-img-item:nth-child(3n) {
          margin-right: 0px;
        }
        .img-pro-item {
          position: relative;
          float: left;
          width: 55px; 
          height: 55px;
          margin-right: 18.75px;
          margin-bottom: 8px;
          border-radius: 4px;
          border: 1px solid #eee;
          background: #eee;
          overflow: hidden;
          cursor: pointer;
          box-sizing: border-box;
          .clack-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.55);
            .close {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
            }
          }
          .img-pro-box {
            width: 100%;
            min-height: 100%;
            display: block;
          }
        }
        .img-pro-item:nth-child(5n) {
          margin-right: 0px;
        }
        .img-pro-item:hover .clack-box, .actor-img-item:hover .clack-box {
          display: block;
        }
      }
      .up-item {
        width: 440px;
        height: 55px;
        margin-top: 12px;
        .up-title {
          line-height: 55px;
          margin-right: 15px;
        }
        .up-box {
          width: 55px;
          height: 55px;
        }
      }
      .f-item {
        margin-bottom: 20px;
      }
      .f-item.f-long {
        margin-left: -28px;
      }
      .f-title {
        line-height: 40px;
        margin-right: 15px;
      }
      .input-box {
        position: relative;
        width: 350px;
        .tip {
          position: absolute;
          right: -215px;
          top: 50%;
          width: 200px;
          line-height: 18px;
          transform: translateY(-50%);
          color: #f00;
        }
        .add-director {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 2;
        }
      }
      .input-box.f-small-box {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        .small-input {
          width: 25%;
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