//加载数据
$(document).ready(function() {
	var now = new Date();
	var month = now.getMonth()+1;
	month = month<10?"0"+month:month;
	var hours = now.getHours();
	hours = hours<10?"0"+hours:hours;
	var minute = now.getMinutes()
	minute = minute<10?"0"+minute:minute;
	var seconds = now.getSeconds();
	seconds = seconds<10?"0"+seconds:seconds;
	var beginTimeStr = now.getFullYear()+"-"+month+"-"+now.getDate()+" "+"00:00:00";
	var endTimeStr =  now.getFullYear()+"-"+month+"-"+now.getDate()+" "+hours+":"+minute+":"+seconds;
	$("#lease_begin_time").val(beginTimeStr);
	$("#lease_end_time").val(endTimeStr);
	search()
})

function checkData(res) {
	var data = [{leaseNo:"CX2017062717052420",carNo:"浙A36Y97",userName:"韩梅梅",telPhone:"15225225252",
	leaseCreateTimeStr:"2017-06-28 12:30:30",takeTimeStr:"2017-06-28 13:10:00",leaseID:"1602"}]
	return data
}

function search() {
	$('#tab').bootstrapTable('destroy');
	$('#tab').bootstrapTable({
		method: 'get', //请求方式（*）
		url: "/rentCar.do", //请求后台的URL（*）
		cache: false,
		strictSearch: true,
		height: "",
		striped: true, //是否显示行间隔色
		pagination: true, //是否显示分页（*）
		//        pageList:[ 10, 20,50,100 ],//可供选择的每页的行数（*）
		pageSize: 10, //每页的记录行数（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		sidePagination: 'client', //分页方式：client客户端分页，server服务端分页（*）
		contentType: "application/x-www-form-urlencoded",
		queryParams: queryParams, //传递参数（*）表示每次发送给服务器的参数，可以添加自己需要的参数
		queryParamsType: 'undefined', // undefined
		sortable: true, //是否启用排序
		sortName: "carNo",
		sortOrder: "desc", //排序方式
		search: false, //不显示 搜索框 
		showColumns: false,
		showRefresh: false,
		responseHandler: checkData,
		columns:[
            {
                field:'check',
                width:'30px',
                checkbox:true            
            }, {
                field:'leaseNo',
                title:'订单编号',
                valign:'middle',
                sortable:true 
            }, {
                field:'carNo',
                title:'车牌号',
                valign:'middle'
            }, {
                field:'userName',
                title:'用户名称',
                align:'center',
                valign:'middle'    	
            }, {
                field:'telPhone',
                title:'手机号',
                valign:'middle'                                   
            }, {
                field:'leaseCreateTimeStr',
                title:'预约时间',
                valign:'middle' ,
                sortable:true
            }, {
                field:'takeTimeStr',
                title:'取车时间',
                valign:'middle',
               // formatter:dateFormatter,
                sortable:true
            }, {
                field:'takeLocation',
                title:'取车地点',
                valign:'middle',
               // formatter:dateFormatter,
                sortable:true
            }, {
                field:'backLocation',
                title:'还车地点',
                valign:'middle',
               // formatter:dateFormatter,
                sortable:true
            }, {
                field:'backTimeStr',
                title:'还车时间',
                valign:'middle',
                sortable:true
            }, {
                field:'payMoney',
                title:'支付费用/元',
                align:'center',
                valign:'middle'
            }, {
                field:'leaseStatus',
                title:'订单状态',
                valign:'middle',
            }, {
                field:'operate',
                title:'操作',
                valign:'middle',
                formatter:operateFormatter,
                events:operateEvents 
            }
        ],
		onLoadSuccess: function(data) {

		},
		onLoadError: function() {
			layer.msg('服务器异常，请稍后重试');
		}
	});
}
//请求数据传递
var sn;
var so;

function queryParams(params) {
	sn = params.sortName;
	so = params.sortOrder;
	 return {
        pageSize: params.pageSize,
        pageNumber: params.pageNumber,
        sortName: params.sortName,
        sortOrder: params.sortOrder,
        beginTime: $('#lease_begin_time').val(),
        endTime: $('#lease_end_time').val(),
        backStartTime:$("#rentCar_begin_time").val(),
        backEndTime:$("#rentCar_end_time").val(),
        status: $('#leaseStatus').val(),
        leaseNo: $('#leaseno').val(),
        carNo: $('#carno').val(),
        userName: $('#userName').val(),
        telphone: $('#telphone').val(),
		companyID:""
//      companyID:readCookie("companyID")
    };
};
//添加操作按钮
function operateFormatter(value, row, index) {
	return [
		'<button class="operateBtn detail btn btn-primary btn-xs">订单详情</button>',
		'<button class="operateBtn check btn btn-success btn-xs">验车详情</button>',
		'<button class="operateBtn rent btn btn-warning btn-xs">App还车</button>',
		'<button class="operateBtn finishLease btn btn-success btn-xs">异常订单</button>',
		'<button class="operateBtn charge btn btn-warning btn-xs">缴费</button>',
		'<button class="operateBtn accident btn btn-success btn-xs">事故录入</button>',
		'<button class="operateBtn fault btn btn-warning btn-xs">故障录入</button>',
		'<button class="operateBtn illegal btn btn-success btn-xs">违章录入</button>',
	].join('');
}

////创建模态框变量
var layerIndex;
window.operateEvents = {
	//	订单详情
	"click .detail": function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["订单详情", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "800px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#leaseDetailTable'),
		});
		detailVm.getInfo(JSON.stringify(row))
	},
	//验车信息
	"click .check":function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["验车详情", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "800px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#checkTable'),
		});
		checkVm.getInfo(row.leaseID)
	},
	//App还车
	"click .rent":function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["验车详情", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "800px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#rentTable'),
		});
		rentVm.appear()
	},
}

//----------------------------------------头部按钮操作-----------------------------------------
//查询按钮
var showAdd  = new Vue({
	el:"#second_content_box",
	data:{
		datas:[]
	},
	methods:{
		searchBtn:function(){
			search()
		}
	}
})
//导出按钮
var showAdd  = new Vue({
	el:"#content_box",
	data:{
		datas:[]
	},
	methods:{
		exportBtn:function(){
			console.log("导出表单")
		}
	}
})
//-------------------------------------------订单详情------------------------------------------
var detailVm = new Vue({
	el:"#leaseDetailTable",
	data:{
		datas:[]
	},
	methods:{
		getInfo:function(row){
			this.datas = JSON.parse(row);
		},
		detailClose:function(){
			layer.close(layerIndex)
		}
	}
})
//--------------------------------------------验车详情---------------------------------------------
var checkVm = new Vue({
	el:"#checkTable",
	data:{
		datas:[],
	},
	methods:{
		getInfo:function(id){
			var dataStr = {
				leaseID:id
			}
			$.ajax({
				type:"post",
				url:"../../lease/showCheckOrder.do",
				data:dataStr,
				dataType:"json",
				cache:false,
				success:function(resdata){
					var data={frontImg:"http://106.14.77.133:10080/picLib/carSharing/car/carmodel/img/k12.png"}
					this.datas = resdata.data
				},
				error:function(){
					layer.msg("服务器异常，请稍后重试")
				}
			})
		},
		checkClose:function(){
			layer.close(layerIndex)
		}
	}
})
//--------------------------------------------App还车-----------------------------------------------
var rentVm = new Vue({
	el:"#rentTable",
	data:{
		datas:[]
	},
	methods:{
		appear:function(){
			var dataStr = {
				remark:"",
				backTime:""
			}
			this.datas = dataStr
		},
		rentSubmit:function(){
			console.log(JSON.stringify(this.datas)) 
		}
	}
})
