// pages/article/index.js

const app = getApp();
console.log(app);

Page({

    data:{
      'articleList':[{
        'id':1,
      }]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      console.log(that.data.articleList);
      console.log('that.data.articleList');
      var data = [];
      data['openId'] = app.globalData.openId;
      wx.request({
          url: app.globalData["api-url"]+'/api/article',
          // url: 'http://test.wechat-api.com/api/article',
          method:'get',
          data:data,
          headers: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
               console.log(res.data)
              // console.log(res)
              // that.modalTap();
              // that.data.articleList = res.data
              // // res.data
              // console.log('that.data.articleList');
              // console.log(that.data.articleList);
              that.setData({
                  articleList: res.data,
                  //res代表success函数的事件对，data是固定的，list是数组
              })
          }
      });
  },


})