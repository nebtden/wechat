//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        categories: [],
        companies: [],
    },

    onLoad: function () {
        let that = this
        wx.request({
            url: app.globalData["api-url"]+'/api/categories',
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

        wx.request({
            url: app.globalData["api-url"]+'/api/company',
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    companies: res.data,
                })
            }
        });
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            hidden:false
        })
    }
})
