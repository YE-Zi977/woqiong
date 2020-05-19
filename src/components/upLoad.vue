<template>
  <!-- 上传组件 -->
  <div class="up-load" :class="disable ? 'disable' : ''">
    
    <label v-show="!disable" class="up-label">
      <input type="file" class="up-file" @change="upLoad" :accept="type">
    </label>

  </div>
</template>

<script>
  export default {
    name: 'UpLoad',
    props: {
      // 文件类型
      type: {
        type: String,

        default() {
          return 'image/jpg,image/jpeg,image/png,image/PNG'
        }
      },
      // 是否禁用
      disable: {
        type: Boolean,

        default() {
          return false
        }
      }
    },
    methods: {
      upLoad(e) {

        let file = e.target.files[0];
        if (file == undefined) {
          return;
        }
        
        let data = {
          type: file.type,
          size: file.size
        }

        // 创建文件阅读对象
        let fileReader = new FileReader();

        // 监听文件是否被读取完
        fileReader.onload = e => {
          
          data.base64Url = e.target.result;
          this.$emit('upLoad', data);
        }

        // 以路径的方式读取文件
        fileReader.readAsDataURL(file);

      }
    }
  }
</script>

<style lang="less" scoped>

  .up-load {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #dcdfe6;
    border-radius: 10%;
    box-sizing: border-box;
    .up-label {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 1;
    }
    .up-file {
      display: none;
    }
  }
  .up-load:hover {
    border-color: #aaa;
  }
  .up-load.disable {
    opacity: .5;
    cursor: no-drop;
  }
  .up-load.disable:hover {
    border-color: #dcdfe6;
  }
  .up-load::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 4%;
    height: 27%;
    background: #aaa;
  }
  .up-load::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 27%;
    height: 4%;
    background: #aaa;
  }

</style>