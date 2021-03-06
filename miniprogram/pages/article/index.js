// pages/article/index.js

const app = getApp();

Page({

    data:{
        'articleList':[{
            'id':1,
            'title':'test test',
        }],
        msgs2:[]
    },
    onShow(){

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        console.log(that.data.articleList);
        console.log('that.data.articleList');
        wx.request({
            url: app.globalData["api-url"]+'/api/article',
            // url: 'http://test.wechat-api.com/api/article',
            method:'get',
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
                that.getMsgs2(res.data);
            }
        });
    },
    getMsgs2(datas){
        //调用数据

        var that = this;
        datas.forEach((n, index) =>{

            // app.WxParse.wxParse('desc'+index, 'html',n.desc, that, 8);
            // app.WxParse.wxParse('title'+index, 'html',n.title, that, 5);
            //
            // if(n.thumb_url.length>1){
            //     n.directionType='direction-column-reverse auto';
            // }else if(n.directionType.indexOf("auto")>=0&&n.thumb_url.length==1){
            //     n.directionType='row'
            // }
            n.title = that.data['title' + index];
            n.desc = that.data['desc' + index];
        });

        that.setData({
            msgs2: datas
        });
    }


})