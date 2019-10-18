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
                    wx.getUserInfo({
                        success: function (msg){
                            //发起网络请求
                            wx.request({
                                // url: 'https://zhangsimon.space/code',
                                url: that.globalData["api-url"]+'/code',
                                method: 'GET',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    code: res.code,
                                    encryptedData: msg.encryptedData,
                                    iv: msg.iv
                                },
                                success: data=>{
                                    console.log('data');
                                    console.log(data);
                                    that.globalData.openId = data.data.openid;
                                    console.log(data);
                                },
                                fail: res=> {
                                    console.log(res)
                                }
                            })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })


        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        openId: null,
        "api-url": "http://test.wechat-api.com",
    },
    renderUrl(url, defaultUrl) {
        if (!url || url=="") {
            url = defaultUrl;
        }
        if (url.indexOf("__weui-popup")>0||url.startsWith("tel:")||url.startsWith("http://")||url.startsWith("https://")) {
            return url;
        }
        if (url.indexOf("/pages/" + url) != 0) {
            url = "/pages/" + url + "/index";
        }
        return url;
    },
})