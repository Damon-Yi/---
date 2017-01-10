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

        ],
        tempNameValue: '',
        tempPhoneValue: '',
        nameFocus: false,
        phoneFocus: false,

        isTipsShow:'',//'tips_show tips_center'
        tipsTxt:'',

        isLayerShow:'',//RedPaperShow,OpenPaperShow,MoreRecShow,RuleInsShow,
    },
    recomSubmit: function (e) {
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
            /*5次*/
            this.setData({
                isLayerShow: 'MoreRecShow'
            }); 
        }else{
            /*弹红包*/
            this.setData({
                isLayerShow: 'RedPaperShow'
            }); 
        }
        
        
        //清空输入框
        this.clearInput();
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
    }
});
