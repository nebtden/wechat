//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    hidden: true,
    userInfo: {},
    hasUserInfo: false,
    // open_id:app.open_id,
    open_id:app.globalData["open_id"],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {

    let that = this;
    //判断onLaunch是否执行完毕
    if (app.globalData.open_id){

      console.log('this.data.open_id')
      console.log(this.data.open_id)
    }else{
      app.checkLoginReadyCallback = res => {
        that.setData({
          open_id:app.globalData["open_id"]
        })
        console.log('this.data.open_id')
        console.log(this.data.open_id)
      };

    }
  },

})
