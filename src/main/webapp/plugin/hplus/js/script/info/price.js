//加载数据
$(document).ready(function() {
	search()
})

function checkData(res) {
	return res
}

function search() {
	$('#tab').bootstrapTable('destroy');
	$('#tab').bootstrapTable({
		method: 'get', //请求方式（*）
		url: "/price.do", //请求后台的URL（*）
		cache: false,
		strictSearch: true,
		height: "",
		striped: true, //是否显示行间隔色
		pagination: true, //是否显示分页（*）
		//        pageList:[ 10, 20,50,100 ],//可供选择的每页的行数（*）
		pageSize: 8, //每页的记录行数（*）
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
                checkbox:true
            }, {
                field:'priceName',
                title:'价格名称',
                valign:'middle'               
            }, {
                field:'priceVersion',
                title:'版本号',
                align:'center',
                valign:'middle',
                sortable:true
            }, {
                field:'carModelName',
                title:'车型',
                valign:'middle'               	
            }, {
                field:'minutePrice',
                title:'分钟单价/元',
                align:'center',
                valign:'middle'  
            }, {
                field:'cleanFee',
                title:'清洁费/元',
                align:'center',
                valign:'middle'
            }, {
                field:'safeFee',
                title:'不计免赔/元',
                align:'center',
                valign:'middle'
            }, {
                field:'status',
                title:'状态',
                valign:'middle',
                formatter:statusFormatter 
            }, {
                field:'newStatus',
                title:'最新状态',
                align:'center',
                valign:'middle',
                formatter:newStatusFormatter
            }, {
                field:'companyName',
                title:'公司名称',        
                valign:'middle'
            }, {
            	 field: 'operation',
                 title: '操作',
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
		companyID: "",
		status: $('#rentCarStatus').val()
	};
};
//添加操作按钮
function operateFormatter(value, row, index) {
	return [
		'<button class="edit btn btn-primary btn-xs">修改信息</button>',
		'<button class="detail btn btn-warning btn-xs">价格详情</button>'
	].join('');
}
//点击操作按钮
window.operateEvents = {
	"click .edit": function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["修改价格信息", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "700px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#editPriceTable'),
		});
		editVm.getInfo(row,row.carModel)
	},
	"click .detail":function(e,value,row,index){
		layerIndex = layer.open({
			type: 1,
			title: ["修改价格信息", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "700px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#detailPriceTable'),
		});
		detailVm.detailShow(row)
	}
	
}

//--------------------------------------------顶部按钮操作----------------------------------
var layerIndex;
var showAdd = new Vue({
	el:"#content_box",
	data:{
		datas:[]
	},
	methods:{
		searchBtn:function(){
			search();
		},
		addNew:function(){
			layerIndex = layer.open({
				type: 1,
				title: ["新增价格信息", 'font-size:18px;color:#666'],
				closeBtn: 1,
				area: "700px",
				offset: "55px",
				shadeClose: true,
				skin: 'demo-class',
				content: $('#addPriceTable'),
			});
			addVm.appearShow();
		},
		//导出按钮
		exportBtn: function() {
			console.log("导出表单")
		}
	}
})

//---------------------------------------------新增价格-------------------------------
var addVm = new Vue({
	el:"#addPriceTable",
	data:{
		model:"",
		datas:[]
	},
	methods:{
		appearShow:function(){
			var dataStr = {priceName:"",carModel:"",minutePrice:"",hourMileage:"",cleanFee:"",safeFee:"",calcType:"",
							superPrice:"",earlyBegin:"",earlyEnd:"",nightBegin:"",nightEnd:"",earlySale:"",nightSale:""}
			var getModelData = {
//				companyID: $.cookie("companyID"),
				companyID:"2"
			}
			$.ajax({
				type:"post",
				url:"../../car/loadAllCarModel.do",
				data:getModelData,
				dataType:"json",
				success:function(resdata){
					dataStr.carModel = resdata.data
				},
				error:function(){
					layer.msg("车型获取失败")
				}
			})
			this.datas = dataStr;
		},
//		新增提交
		addSubmit:function(){
			var dataStr =JSON.parse(JSON.stringify(this.datas))
			dataStr.carModel = this.model;
			dataStr.earlyBegin = $("#addEarlyBegin").val().substr($("#addEarlyBegin").val().length-8);
			dataStr.earlyEnd = $("#addEarlyEnd").val().substr($("#addEarlyEnd").val().length-8);
			dataStr.nightBegin = $("#addNightBegin").val().substr($("#addNightBegin").val().length-8);
			dataStr.nightEnd = $("#addNightEnd").val().substr($("#addNightEnd").val().length-8);
			console.log(dataStr);
			$.ajax({
				type:"post",
				url:"../../price/addPrice.do",
				data:dataStr,
				dataType:"json",
				success:function(resdata){
					console.log(resdata)
					layer.close(layerIndex);
					layer.msg("添加成功");
					$("#tab").bootstrapTable("refresh");  
				},
				error:function(){
					layer.msg("服务器异常，请稍后重试")	
				}
			})
		},
//		取消
		addClose:function(){
			layer.close(layerIndex)
		}
		
	}
})
//--------------------------------------------修改信息---------------------------------
var editVm = new Vue({
	el:"#editPriceTable",
	data:{
		model:"",
		datas:[]
	},
	methods:{
		getInfo:function(obj,models){   
			var dataStr = JSON.parse(JSON.stringify(obj))
			var now = new Date();
			var month=now.getMonth()+1;
			month=month<10?"0"+month:month
			var dates = now.getFullYear()+"-"+month+"-"+now.getDate();
			//避免重复添加年月日
			if(dataStr.earlyBegin.length=="8"){
				dataStr.earlyBegin =dates+" "+dataStr.earlyBegin; 
				dataStr.earlyEnd =dates+" "+dataStr.earlyEnd; 
				dataStr.nightBegin = dates + " "+dataStr.nightBegin;
				dataStr.nightEnd = dates + " "+dataStr.nightEnd;				
			}
			var getModelData = {
//				companyID:$.cookie("companyID")
				companyID:2,
			}
			$.ajax({
				type:"post",
				url:"../../car/loadAllCarModel.do",
				data:getModelData,
				cache:false,
				dataType:"json",
				success:function(resdata){
					dataStr.carModel = resdata.data;
					editVm.model = models;
				},
				error:function(){
					layer.msg("车型获取失败")
				}
			})			
			this.datas = dataStr;
		},		
		editSubmit:function(){
			var dataStr = JSON.parse(JSON.stringify(this.datas));
			dataStr.carModel = this.model;
			dataStr.earlyBegin = $("#editEarlyBegin").val().substr($("#editEarlyBegin").val().length-8);
			dataStr.earlyEnd = $("#editEarlyEnd").val().substr($("#editEarlyEnd").val().length-8);
			dataStr.nightBegin = $("#editNightBegin").val().substr($("#editNightBegin").val().length-8);
			dataStr.nightEnd = $("#editNightEnd").val().substr($("#editNightEnd").val().length-8);
			console.log(dataStr)
			$.ajax({
				type:"post",
				url:"../../price/changeCompanyPrice.do",
				data:dataStr,
				dataType:"json",
				success:function(resdata){
					console.log(resdata)
					layer.close(layerIndex);
					layer.msg("保存成功");
					$("#tab").bootstrapTable("refresh");  
				},
				error:function(){
					layer.msg("服务器错误请稍后重试")
				}
			})
		},
		editClose:function(){
			layer.close(layerIndex)
		}
	}
})
//---------------------------------------------价格详情--------------------------------
var detailVm = new Vue({
	el:"#detailPriceTable",
	data:{
		datas:[]
	},
	methods:{
		detailShow:function(obj){
			this.datas = obj
		},
		detailClose:function(){
			layer.close(layerIndex)
		}
	}
})

//---------------------------------------------字段操作--------------------------------
//状态
function statusFormatter(value,row,index){	
	var status;
	switch (row.status){
		case 1:
			status="正常"
			break;
		case 2:
			status="已调价"
			break;
		case 3:
			status="作废"
			break;
		default:
			break;
	}
	return status;
}
//最新状态
function newStatusFormatter(value,row,index){
	var newStatus;
	switch (row.status){
		case 0:
			newStatus="已调价"
			break;
		case 1:
			newStatus="最新"
			break;
		default:
			break;
	}
	return newStatus;
}

