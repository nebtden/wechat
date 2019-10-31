// pages/article/add.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        categories: [],
        files: [],
        image: '',
        locationAddress:'',
        longitude:'',
        latitude:'',
        hasLocation:false,
    },

    bindGetUserInfo (e) {
        console.log('e.detail.userInfo')
        console.log(e.detail.userInfo)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success () {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                        }
                    })
                }
            }
        });

        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        });

        wx.request({
            url: app.globalData["api-url"]+'/api/category',
            method:'get',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                let categories = [];
                for (let i = 0; i < res.data.length; i++) {
                    console.log('res.data[i]');
                    console.log(res.data[i]);
                    categories.push(res.data[i].name)
                }
                that.setData({
                    categories: categories,
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
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            count:1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

                wx.uploadFile({
                    url: app.globalData["api-url"]+'/api/upload/company', //仅为示例，非真实的接口地址
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': app.globalData["api-url"]
                    },
                    success (res){
                        // const data = res.data;
                        that.setData({
                            image: res.data
                        });
                    }
                })

                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },

    chooseLocation() {
        const that = this
        wx.chooseLocation({
            success(res) {
                console.log(res)
                that.setData({
                    hasLocation: true,
                    longitude:res.longitude,
                    latitude:res.latitude,
                    locationAddress: res.address
                })
            }
        })
    },

    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        let that = this;
        console.log(that.data.list);
        console.log('that.data.list');
        let data = e.detail.value;
        data.image = that.data.image;
        data.longitude = that.data.longitude;
        data.latitude = that.data.latitude;
        data.open_id = app.globalData['openId'];
        console.log();
        wx.request({
            url: app.globalData["api-url"]+'/api/company',
            method:'post',
            data:data,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log('res.data.status')
                console.log(res.data.status)
                if(res.data.status==1){
                    wx.redirectTo({
                        url: 'show?id='+res.data.data.id
                    })
                }else{
                    //弹出错误警告
                }

            }
        });
    },

})