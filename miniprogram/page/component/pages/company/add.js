// pages/article/add.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      categories: ['生产厂家','销售企业','加工企业'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      wx.request({
          url: app.globalData["api-url"]+'/api/category',
          method:'get',
          headers: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
              console.log(res.data);
              that.setData({
                  categories: res.data,
              })
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindCategoryChange: function(e) {
      console.log('picker account 发生选择改变，携带值为', e.detail.value);

      this.setData({
          categoryIndex: e.detail.value
      })
  },

})