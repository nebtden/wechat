//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,

      lvcai_types: ['美国', '中国', '巴西', '日本'],
      lvcai_index: 0,
      products:[],
      product_index:'',

    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            lvcai_index: e.detail.value
        })
    },
    typeChange:function (e) {
        var _this = this;
        console.log('picker发送选择改变，携带值为', e.detail.value)
        wx.request({
            url: 'http://test.lvcai.com/data.json', //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                console.log(res.data.x);
                _this.setData({
                    products: res.data.x,
                    // hasUserInfo: true
                })
            }
        })
    },
    ProductChange: function(e) {
        console.log('product发送选择改变，携带值为', e.detail.value)
        this.setData({
            product_index: e.detail.value
        })
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
