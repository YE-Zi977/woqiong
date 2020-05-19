// 定义一个通用类

 class Utils {

   constructor() {}

   // 正则验证
   vaildReg(value, reg) {

    // value: 验证的值
    // reg: 验证规则

    let regObj = new RegExp(reg);

    return regObj.test(value);

   }

   // 处理日期
   handleDate(dateObj, str) {

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();

    return year + str + (month >= 10 ? month : '0' + month) + str + (day >= 10 ? day : '0' + day);

   }

   // 处理时间
   handleTime(dateObj, str) {

    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();

    return (hours >= 10 ? hours : '0' + hours) + str + (minutes >= 10 ? minutes : '0' + minutes) + str + (seconds >= 10 ? seconds : '0' + seconds);

   }

   // 清空token
   clearToken() {
     // 清空cookies
     for (let i = 0; ; i++) {
      if (!this.$cookies.isKey('w' + i)) {
        break;
      }

      this.$cookies.remove('w' + i)
    }
   }

 }

 // 导出实例
 export const utils = new Utils();