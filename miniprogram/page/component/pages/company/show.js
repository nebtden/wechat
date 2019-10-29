// page/component/pages/company/show.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        'id':0,
        'company':[],
        latitude: 23.099994,
        longitude: 113.324520,
        subKey: 'ZOGBZ-6VVWX-4TP4D-7CDE7-XFWBH-X5BRV',

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        this.setData({
            id: options.id
        })
        console.log(options.id);
        let id = options.id;
        wx.request({
            url: app.globalData["api-url"]+'/api/company/'+id,
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                if(res.data.status){
                    console.log('res.data.data');
                    that.setData({
                        company: res.data.data,
                    })
                }

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

    }
})