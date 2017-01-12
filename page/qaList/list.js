Page({
    data: {
        list:{
            	type:'1',
            	typeId:'0',
            	typeName:'还款信息',
            	qas:[{
                        infoId:'1',
                        infoTxt:'我的还款状态是什么？'
                    },
                    {
                        infoId:'2',
                        infoTxt:'我的还款账号是什么？'
                    },
                    {
                        infoId:'3',
                        infoTxt:'我还款成功了吗？'
                    }
            	]
            },
        searchTxt:''
    },
    onLoad: function(options){
        console.log(options);
    },
    onReady: function() {// Do something when page ready.

    }
});
