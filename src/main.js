import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

// 导入cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)

Vue.config.productionTip = false

// 设置请求路径
axios.defaults.baseURL = 'http://192.168.1.108:10000';

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 携带cookies
axios.defaults.withCredentials = true;

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  let pathNames = ['AddMovie', 'AddInfo'];

  if (pathNames.indexOf(from.name) > -1) {
    const MessageBox = ElementUI;

    MessageBox.confirm('编辑将不保存, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    }).then(() => {

      next();
      
    }).catch(() => {
     
      next({name: from.name});
    });
    return 
  }

  next();

})

// 添加axios请求拦截器，改方法在请求之前触发
axios.interceptors.request.use(config => {

  // console.log(config);

  if (config.method === 'post') {
    // 处理请求参数
    if (config.data) {
      let params = '';
      for (let key in config.data) {
        params += key + '=' + config.data[key] + '&';
      }

      config.data = params.slice(0, -1);
    }
  }

  return config;

}, err => {
  return Promise.reject(err);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
