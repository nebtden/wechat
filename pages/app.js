//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        //将logs存储到缓存中
        wx.setStorageSync('logs', logs)
    },
    getUserInfo:function(cb){
        var that = this;
        //如果能获取用户信息
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            //如果不能获取用户信息
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            //that调用app的globalData，globalData是被事先声明了的
                            that.globalData.userInfo = res.userInfo;
                            //TODO 后续补充这个，目前不是很懂下面代码
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },
    globalData:{
        userInfo:null
    }
})