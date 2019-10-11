const app = getApp();

Page({
    formSubmit: function (e) {
        var that = this;
        var formData = e.detail.value;
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var data = formData;
         data['openId'] = app.globalData.openId;
        wx.request({
            url: app.globalData["api-url"]+'/api/article',
            method:'post',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                // that.modalTap();
            }
        });
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },
    articleList:function () {
        wx.navigateTo({
            'url':'index'
        });
    }
})