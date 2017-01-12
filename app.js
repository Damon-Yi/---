App({
  data:{
    code:'',
  },
    onLaunch: function () {
        console.log('App Launch');
        wx.login({
          success: function(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://min.yiqitansuo.com',
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },

    globalData:{
      userInfo:null
    }
});