//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var that = this;
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log('res.code');
                console.log(res.code);
                if (res.code) {
                    //获取用户信息
                    wx.request({
                        // url: 'https://zhangsimon.space/code',
                        url: that.globalData["api-url"]+'/code',
                        method: 'GET',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            code: res.code,
                        },
                        success: data=>{
                            console.log('data');
                            console.log(data);
                            that.globalData.openId = data.data.openid;
                            console.log('data.data.openid');
                            console.log(data.data.openid);
                        },
                        fail: res=> {
                            console.log(res)
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })


        // 获取用户信息
        wx.getSetting({

        })
    },
    globalData: {
        userInfo: null,
        openId: null,
         "api-url": "http://test.wechat-api.com",
        //"api-url": "http://zhangsimon.space",
    },
})