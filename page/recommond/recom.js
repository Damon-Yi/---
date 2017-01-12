var app = getApp();
Page({
    data: {
        list: [
            {
                id:'1',
                name:'xiaos'
            },
            {
                id:'2',
                name:'fds56'
            }
        ],
        swiperList:[
            {
                id:'msg1',
                text:'中奖sdfasdfsad消息1' 
            },
            {
                id:'msg2',
                text:'中奖消gfdgfdgds息2' 
            },
            {
                id:'msg3',
                text:'中zvcxzvcvx奖消息3' 
            }
        ],

        toView: 'msg1',
        toViewIndex:0,

        tempNameValue: '',
        tempPhoneValue: '',
        nameFocus: false,
        phoneFocus: false,

        isTipsShow:'',//'tips_show tips_center'
        tipsTxt:'',

        isLayerShow:'commendPanelShow',//RedPaperShow,OpenPaperShow,MoreRecShow,RuleInsShow,commendPanelShow,commendPanelSucShow,commendPanelFailShow
        successPanelInfo:'',
        userIconUrl:'',
        userName:'',
        encryptedData:'',
        iv:'',
       _code:'',
        store_id:'',
        sale_id:'',
 
        starts:[
            [
                {
                    id:'start1',
                    isSelected:false 
                },
                {
                    id:'start2',
                    isSelected:false 
                },
                {
                    id:'start3',
                    isSelected:false 
                },
                {
                    id:'start4',
                    isSelected:false 
                },
                {
                    id:'start5',
                    isSelected:false 
                }
            ],[
                {
                    id:'start6',
                    isSelected:false 
                },
                {
                    id:'start7',
                    isSelected:false 
                },
                {
                    id:'start8',
                    isSelected:false 
                },
                {
                    id:'start9',
                    isSelected:false 
                },
                {
                    id:'start10',
                    isSelected:false 
                }
            ]
        ]
    },

    onReady: function() {// Do something when page ready.

        var _that = this;

        wx.getUserInfo({
          success: function(res) {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            var gender = userInfo.gender; //性别 0：未知、1：男、2：女 
            var province = userInfo.province;
            var city = userInfo.city;
            var country = userInfo.country;
            _that.setData({
                userIconUrl: avatarUrl,
                userName: nickName,
                encryptedData:res.encryptedData,
                iv:res.iv
            });
          }
        })
        _that.setData({
            //isLayerShow:'commendPanelShow'
        });


        
        setInterval(function(){
            if(_that.data.toViewIndex<_that.data.swiperList.length){
                _that.setData({
                    toView: _that.data.swiperList[_that.data.toViewIndex].id,
                    toViewIndex:_that.data.toViewIndex+1
                });
            }else{
                _that.setData({
                    toView: _that.data.swiperList[0].id,
                    toViewIndex:0
                });
            }
        },1500);
    },
    recomSubmit: function (e) {
        var _that = this;
        console.log(e);
        var phone = this.data.tempPhoneValue,
        name = this.data.tempNameValue;
        console.log(phone);
        console.log(name);
        if(name==""){
            this.setData({
              nameFocus: true,
              isTipsShow:'tips_show tips_center',
              tipsTxt:'姓名不能为空'
            });
            this.removeTips();
            return false;
        }
        if(phone==""){
            this.setData({
              phoneFocus: true,
              isTipsShow:'tips_show tips_center',
              tipsTxt:'手机号不能为空'
            });
            this.removeTips();
            return false;
        }else if(!/^[a-z0-9_-]{6,12}$/.test(phone)){
            this.setData({
              phoneFocus: true,
              isTipsShow:'tips_show tips_center',
              tipsTxt:'手机号格式不正确'
            });
            this.removeTips();
            return false;
        }
 
         wx.login({
            success: function(res){
                var code = res.code;
                 wx.getUserInfo({
                    success: function (res) {
                        _that.setData({
                            encryptedData:res.encryptedData,
                            iv:res.iv
                        });
                        request(_that,{'encryptedData':_that.data.encryptedData,'iv':_that.data.iv,'code':code,'name':name,'phone':phone,'store_id':_that.data.store_id,'sale_id':_that.data.sale_id});
                    }
                })
            }
        });
            

/** 
        var recItem = {
            id:'3',
            name:name
        }
        var recItems = this.data.list;
        recItems.push(recItem);
        this.setData({
            list: recItems
        });
        if(recItems.length>5){
            
            this.setData({
                isLayerShow: 'MoreRecShow'
            }); 
        }else{
           
            this.setData({
                isLayerShow: 'RedPaperShow'
            }); 
        }
        
       
       request({'encryptedData':this.data.encryptedData,'iv':this.data.iv,'code':this.data._code,'name':name,'phone':phone,'store_id':this.data.store_id,'sale_id':this.data.sale_id});*/
        //清空输入框
        
    },
    bindNameInput: function(e) {
        this.setData({
          tempNameValue: e.detail.value
        });
    },
    bindPhoneInput: function(e) {
        this.setData({
          tempPhoneValue: e.detail.value
        });
    },
    removeTips:function(){//隐藏提示
        var _that = this;
        setTimeout(function(){
            _that.setData({
              isTipsShow:'',
              tipsTxt:''
            });
        },1500);
    },
    clearInput:function(){//清空输入框
        this.setData({
            tempNameValue: '',
            tempPhoneValue: ''
        });
    },
    closeLayer:function(){//关闭弹窗
        this.setData({
            isLayerShow: ''
        });
    },
    OpenPaper:function(){//红包拆开
        this.setData({
            isLayerShow: 'OpenPaperShow'
        });
    },
    openRuleIns:function(){//规则
        this.setData({
            isLayerShow: 'RuleInsShow'
        });
    },
    // onShareAppMessage: function () {
    //     return {
    //       title: 'Damon',
    //       desc: '小程序分享',
    //       path: 'page/recommond/recom'
    //     }
    // }
    commendSubmit:function(){//评价提交
        var _that = this;
        var index_1 = '';
        var index_2 = '';
        var startsArr = this.data.starts;
        for(var j = 0;j<startsArr[0].length;j++){
            if(startsArr[0][j].isSelected ){
                index_1 = j;
            }
        }

        for(var j = 0;j<startsArr[1].length;j++){
            if(startsArr[1][j].isSelected ){
                index_2 = j;
            }
        }

        this.setData({
            isLayerShow: 'commendPanelSucShow',
            successPanelInfo:'提交成功',
            //isLayerShow: 'commendPanelFailShow'
            sale_id:index_1+1,
            store_id:index_2+1
        });
        setTimeout(function(){
            _that.setData({
                isLayerShow: ''
            });
        },1500);
    },
    startTap:function(event){//
        var curId = event.currentTarget.id;
        var startsArr = this.data.starts;
        for(var i = 0;i<startsArr.length;i++){
            for(var j = 0;j<startsArr[i].length;j++){
                if(curId==startsArr[i][j].id){
                    for(var k = 0;k<=j;k++){
                        startsArr[i][k].isSelected = true;
                    }
                    for(var l = j+1;l<startsArr[i].length;l++){
                        startsArr[i][l].isSelected = false;
                    }
                    this.setData({
                        starts: startsArr
                    });
                }
            }
        }
    }
});


//好友推荐服务器请求
function request(obj,arr){
    console.log(arr);
    wx.showToast({
        title:'loading',
        icon: 'loading',
        duration: 1500
    });
    wx.request({
        url: 'https://min.yiqitansuo.com/appapi/mini/userinfo', 
        data: {'encryptedData':arr.encryptedData,'iv':arr.iv,'code':arr.code,'name':arr.name,'phone':arr.phone,'store_id':arr.store_id,'sale_id':arr.sale_id},
        method:'POST',
        header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
        success: function(res) {
            console.log(res.data.msg);
            // wx.showToast({
            //     title: res.data.msg?res.data.msg:'',
            //     icon: 'success',
            //     duration: 5000
            // });
            obj.setData({
                isLayerShow: 'commendPanelSucShow',
                successPanelInfo:res.data.msg
                //isLayerShow: 'commendPanelFailShow'
            });
            obj.clearInput();
            setTimeout(function(){
                obj.setData({
                    isLayerShow: ''
                });
            },4000);
        }
    })
}
