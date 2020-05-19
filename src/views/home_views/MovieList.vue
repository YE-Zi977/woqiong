<template>
  <div class="movie-list h-100">

    <div class="top-nav clearfix">
      <div class="fl">电影管理</div>
      <div class="fl"><i class="el-icon-arrow-right"></i></div>
      <div class="fl current-nav">电影产品</div>
    </div>

    <div class="container scroll">
      <div class="c-top clearfix">
        <div class="fl flex">
          <div class="select-box">
            <div class="s-title">审核状态</div>
            <el-select @change="querySearch" v-model="selectValue1" placeholder="请选择">
              <el-option value="全部">全部</el-option>
              <el-option value="审核中">审核中</el-option>
              <el-option value="已通过">已通过</el-option>
              <el-option value="未通过">未通过</el-option>
            </el-select>
          </div>
          <div class="select-box">
            <div class="s-title">上下架状态</div>
            <el-select @change="querySearch" v-model="selectValue2" placeholder="请选择">
              <el-option value="全部">全部</el-option>
              <el-option value="已下架">已下架</el-option>
              <el-option value="已上架">已上架</el-option>
              <el-option value="未上架">未上架</el-option>
            </el-select>
          </div>
        </div>
        <div class="fr search-box">
          <el-input
            placeholder="通过电影名搜索"
            v-model="nameKey"
            clearable
            @input="querySearch">
          </el-input>
        </div>
      </div>
      <div class="add-movie clearfix">
        <span class="add-btn fl" @click="toPage({name: 'AddMovie'})">发布电影</span>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="序号"
            width="80"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1 + (currentPage - 1) * 10}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="movieId"
            label="电影ID"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="电影名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="enName"
            label="电影英文名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="审核状态"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upDown"
            label="上下架状态"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="发布时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            label="更新时间"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-button @click="toPage({name: 'MovieDetail', params: {movieId: scope.row.movieId}})" type="text" size="small">查看</el-button>
              <el-button @click="toPage({name: 'AddMovie', params: {movieId: scope.row.movieId, isEdit: true}})" type="text" size="small" :disabled="scope.row.status === '审核中'">编辑</el-button>
              <el-button @click="handleClick(scope, '/removeMovie')" type="text" size="small" :disabled="scope.row.status === '审核中' || scope.row.upDown === '已上架'">删除</el-button>
              <el-button @click="handleClick(scope, '/upDown', true)" type="text" size="small" :disabled="scope.row.status !== '已通过'">{{scope.row.upDown === '已上架' ? '下架' : '上架'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @current-change="pageChange"
          :current-page="currentPage"
          :total="pageNumber * 10">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import { utils } from '@/utils/utils'

  export default {
    name: 'MovieList',
    data() {
      return {
        selectValue1: '',
        selectValue2: '',
        tableData: [],
        AllData: [],
        pageNumber: 1,
        nameKey: '',
        
        // 查询结果
        queryResult: [],
        // 当前页码
        currentPage: 1
      }
    },
    created() {

      // 获取电影列表
      this.getMovie();

    },
    methods: {

      // 获取电影列表数据
      getMovie() {

        // 发起请求获取电影列表
        this.axios({
          method: 'get',
          url: '/movieList'
        })
        .then(res => {

          if (res.data.code === 1030) {

            // 电影列表
            let movieList = res.data.result;
            let status = ['--', '审核中', '已通过', '未通过'];
            let upDown = ['--', '已上架', '已下架', '未上架'];
  
            movieList.forEach((v, i) => {
              v.status = status[v.status];
              v.upDown = upDown[v.upDown];
              v.createdAt = utils.handleDate(new Date(v.createdAt), '-');
              v.updatedAt = utils.handleDate(new Date(v.updatedAt), '-');
            })

            this.AllData = movieList.concat();
  
            this.querySearch();

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

      handleClick(scope, url, where){

        let movieId = scope.row.movieId;

        this.axios({
          method: 'post',
          url,
          data: {
            movieId
          }
        })
        .then(res => {

          if (res.data.code === 1100 || res.data.code === 1110) {
            
            this.$message({
              message: res.data.msg,
              center: true,
              type: 'success',
              duration: 1500
            });

            if (where) {
              // 上下架
              if (scope.row.upDown === '已上架') {
                scope.row.upDown = '已下架';
              }else {
                scope.row.upDown = '已上架'
              }
            }else {

              // 删除
              for (let i = 0; i < this.AllData.length; i++) {

                if (movieId == this.AllData[i].movieId) {
                  this.AllData.splice(i, 1);
                  break;
                }

              }

              this.querySearch();

            }

          }else {
            this.$message({
              message:  res.data.msg,
              center: true,
              type: 'warning',
              duration: 1500
            });
          }
          
        })

      },

      // 查询搜索
      querySearch() {
        let page = this.currentPage;

        let rule = [
          {key: 'status', value: this.selectValue1},
          {key: 'upDown', value: this.selectValue2},
          {key: 'name', value: this.nameKey},
        ]

        this.queryResult = this.AllData.filter(v => {
          let flag = true

          for (let i = 0; i < rule.length; i++) {

            if (rule[i].value != '' && rule[i].value != '全部' && rule[i].key != 'name' && v[rule[i].key] != rule[i].value) {
              flag = false;
              break;
            }

            if (rule[i].value != '' && rule[i].key == 'name' && v[rule[i].key].indexOf(rule[i].value) <= -1) {
              flag = false;
              break;
            }

          }
          return flag;
        })

        let len = this.queryResult.length;
        if (len === 0) {
          this.pageNumber = 1;
        }else {
          this.pageNumber = Math.ceil(len / 10);
        }

        if (page > this.pageNumber) {
          page = this.pageNumber;
        }

        this.pageChange(page);

      },

      // 页面跳转
      toPage(path) {
        
        this.$router.push(path);
      },

      // 页码改变时
      pageChange(page) {
        
        let startIndex = (page - 1) * 10;
        let data = this.queryResult;
        this.currentPage = page;

        this.tableData = [];
        for (let i = startIndex; i < startIndex + 10; i++) {

          if (!data[i]) {
            break;
          }

          this.tableData.push(data[i]);
        }

      }
    }
  }
</script>

<style lang="less" scoped>

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
    height: calc(100% - 66px);
    margin-top: 10px;
    padding: 10px 15px 0;
    overflow-y: auto;
    .c-top{
      height: 40px;
      padding: 15px;
      border-radius: 12px;
      background: #fff;
      .select-box {
        display: flex;
        margin-right: 25px;
        .s-title {
          margin-right: 15px;
          line-height: 40px;
        }
      }
      .search-box {
        width: 355px;
        .inline-input {
          width: 100%;
        }
      }
    }
    .add-movie {
      height: 35px;
      padding: 10px;
      // border-bottom: 2px solid #141a32;
      .add-btn {
        height: 35px;
        user-select: none;
        line-height: 35px;
        padding: 0 20px;
        border-radius: 4px;
        background: #007aff;
        color: #fff;
        cursor: pointer;
      }
      .add-btn:active {
        background: rgb(2, 110, 226);
      }
    }
    .footer {
      margin-top: 50px;
      margin-bottom: 30px;
      display: inline-block;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
</style>