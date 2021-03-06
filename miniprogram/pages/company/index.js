// pages/article/index.js

const app = getApp();

Page({

    data:{
        'list':[ ],
        'page': 1,
        'categories': [],
        'provinces': [],
        'category_show':false,
        'province_show':false,
        hasMoreData: true,
    },
    onShow(){

    },
    CategoryClick:function(e){
        var data = e.currentTarget.dataset;
        var index = data.index;
        if(index=='province'){
            this.setData({
                category_show : false,
                province_show : !this.data.province_show,
            });
        }
        if(index=='category'){
            this.setData({
                province_show : false,
                category_show : !this.data.category_show,
            });
        }




    },

    onCategoryItemClick:function(){

    },



    onReachBottom: function () {
        if (this.data.hasMoreData) {
            this.getCompanyInfo('加载更多数据')
        } else {
            wx.showToast({
                title: '没有更多数据',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        console.log(that.data.list);
        console.log('that.data.list');
        wx.request({
            url: app.globalData["api-url"]+'/api/company',
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    list: res.data,
                })
            }
        });

        wx.request({
            url: app.globalData["api-url"]+'/api/provinces',
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    provinces: res.data,
                })
            }
        });

        wx.request({
            url: app.globalData["api-url"]+'/api/categories',
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    categories: res.data,
                })
            }
        });
    },
    getCompanyInfo(){
        let that = this;
        console.log(that.data.list);
        console.log('that.data.list');
        if(that.data.hasMoreData){
            wx.request({
                url: app.globalData["api-url"]+'/api/company',
                data:{ page:that.data.page},
                method:'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    console.log(res.data);
                    if(res.data.length>0){
                        let list = that.data.list.concat(res.data)
                        that.data.page = that.data.page+1;
                        that.setData({
                            list: list,
                        })
                    }else{
                        that.data.hasMoreData=false;
                        wx.showToast({
                            title: '没有更多数据',
                        })
                    }
                }
            });
        }

    }

})