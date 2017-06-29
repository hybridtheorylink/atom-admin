//加载数据
$(document).ready(function() {
	search()
})

function checkData(res) {
	return res
}
function search() {	
	$("#tab").bootstrapTable("destroy");
	$("#tab").bootstrapTable({
		method: 'get', //请求方式（*）
		url: "/company.do", //请求后台的URL（*）
		cache: false,
		strictSearch: true,
		width: 'auto',
		height: "",
		striped: true, //是否显示行间隔色
		pagination: true, //是否显示分页（*）
		pageSize: 10, //每页的记录行数（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		sidePagination: 'client', //分页方式：client客户端分页，server服务端分页（*）
		contentType: "application/x-www-form-urlencoded",
		queryParams: queryParams, //传递参数（*）表示每次发送给服务器的参数，可以添加自己需要的参数
		queryParamsType: 'undefined', // undefined
		sortable: true, //是否启用排序
		sortName: "createTime",
		sortOrder: "desc", //排序方式
		search: false, //不显示 搜索框 
		showColumns: false,
		showRefresh: false,
		responseHandler: checkData,
		columns: [{
			field: 'check',
			checkbox: true
		}, {
			field: 'companyName',
			title: '公司名称',
			valign: 'middle',
			sortable: true
		}, {
			field: 'shortName',
			title: '公司简称',
			valign: 'middle'
		}, {
			field: 'contacts',
			title: '负责人',
			valign: 'middle',
			align: 'center'
		}, {
			field: 'companyPhone',
			title: '联系电话',
			valign: 'middle'
		}, {
			field: 'createtime',
			title: '创建时间',
			valign: 'middle'
		}, {
			field: 'address',
			title: '公司地址',
			valign: 'middle',
		}, {
			field: 'status',
			title: '公司状态',
			valign: 'middle',
			align: 'center',
			formatter: statusFormatter
		}, {
			field: 'remark',
			title: '备注',
			valign: 'middle',
			align: 'center'
		}, {
			field: 'operate',
			title: '操作',
			valign: 'middle',
			formatter: operateFormatter,
			events: operateEvents
		}],
		onLoadSuccess: function(date) {
			//alert("success");       	
		},
		onLoadError: function() {
			layer.msg('服务器异常，请稍后重试');
		}
	})
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
		status: $('#companyStatus').val()
	};
};
//添加操作按钮
function operateFormatter(value, row, index) {
	return [
		'<button class="edit btn btn-primary btn-xs">修改信息</button>',
		'<button class="detail btn btn-warning btn-xs">公司详情</button>'
	].join('');
}

//创建模态框变量
var layerIndex;
window.operateEvents = {
	"click .edit": function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["修改公司信息", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "600px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#editCompany'),
		});
		editVm.getInfo(row);
	},
//	显示公司详情
	"click .detail": function(e, value, row, index){
		layerIndex = layer.open({
			type: 1,
			title: ["公司详情", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "600px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#companyDetail'),
		});	
		showVm.show(row)
	}
}
//-----------------------------------------头部按钮操作---------------------------------
var showAdd = new Vue({
	el: "#content_box",
	data: {
		datas: [],		
	},
	methods: {
		//点击查询按钮
		searchBtn:function(){
			search();
		},
		//点击出现新增模态框
		addNew: function(){
			layerIndex = layer.open({
				type: 1,
				title: ["新增公司信息", 'font-size:18px;color:#666'],
				closeBtn: 1,
				area: "600px",
				offset: "55px",
				shadeClose: true,
				skin: 'demo-class',
				content: $('#addCompany'),
			});			
			addVm.addApear();			
		},		
		//导出按钮
		exportBtn:function(){
			console.log("导出表单")
		}
	}
})
//-----------------------------------------新增------------------------------------
//提交新增数据
var addVm = new Vue({
	el:"#addCompany",
	data:{
		datas:[],	
	},
	methods:{
		addApear:function(){
			this.datas={companyName:"",shortName:"",parentID:"",companyPhone:"",lng:"",lat:"",contacts:"",companyCode:"",
						status:"",regionStatus:"",remark:"",address:""}
		},
		addSubmit:function(){
			console.log(JSON.parse(JSON.stringify(this.datas)))
			$.ajax({
				type:"post",
				url:"../../company/addCompany.do",
				data:JSON.parse(JSON.stringify(this.datas)),
				dataType:"JSON",
				success:function(resdata){
					layer.close(layerIndex);
					$("#tab").bootstrapTable("refresh");
					layer.msg('新增成功');
				},
				error:function(){
					layer.msg('服务器异常，请稍后重试');
				}
			})
		},
		addClose:function(){
			layer.close(layerIndex)
		}
	}
})

//----------------------------------------修改公司信息-----------------------------------------------
//编辑公司信息
var editVm = new Vue({
	el: "#editCompany",
	data: {
		datas: []
	},
	methods: {
		getInfo: function(obj) {
			this.datas={companyName:"",shortName:"",parentID:"",companyPhone:"",lng:"",lat:"",contacts:"",companyCode:"",
						status:"",regionStatus:"",remark:"",address:"",companyID:"",operatorID:""}
			this.datas = obj;
		},
		editSubmit: function(e) {		
			var datas = JSON.parse(JSON.stringify(this.datas));
			datas.companyID = $(e.target).attr("data-id");
			datas.operatorID = $.cookie("operateID");
			console.log(datas)
			$.ajax({
				type:"post",
				url:"../../company/changeCompany.do",
				data:datas,
				dataType:"json",
				success:function(reasdata){
					layer.close(layerIndex);
					$("#tab").bootstrapTable("refresh");
					layer.msg('修改成功');
				},
				error:function(){
					layer.msg('服务器异常，请稍后重试');
				}
			})
		},
		editClose:function(){
			layer.close(layerIndex)
		}
	}
})

//------------------------------------------------显示公司详情----------------------------------------
//显示公司详情
var showVm = new Vue({
	el: "#companyDetail",
	data: {
		datas: []
	},
	methods: {
		show: function(obj) {
			this.datas = obj;
		},
		close:function(){
			layer.close(layerIndex)
		}
	}
})


//-----------------------------------------------字段操作----------------------------------------
//公司状态字段转换
function statusFormatter(value, row, index) {
	var status;
	switch(value) {
		case 1:
			status = "正常"
			break;
		case 2:
			status = "暂停"
			break;
		default:
			break;
	}
	return status;
}