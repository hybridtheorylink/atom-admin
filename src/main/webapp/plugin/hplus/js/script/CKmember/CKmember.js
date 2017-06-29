//加载数据
$(document).ready(function() {
	search()
})

function checkData(res) {
	var resdata = {
		data: [{
			name: "李磊",
			tel: "18368888688",
			sex: "男",
			IDcard: "411481192502534569",
			carType: "K17",
			inviteCode: "27017",
			checkStatus: "待审核",
			companyName:"阿里巴巴"
		}, {
			name: "李磊",
			tel: "18368888688",
			sex: "男",
			IDcard: "411481192502534569",
			carType: "K17",
			inviteCode: "27017",
			checkStatus: "待审核",			
			companyName:"阿里巴巴 "
		}, {
			name: "李磊",
			tel: "18368888688",
			sex: "男",
			IDcard: "411481192502534569",
			carType: "K17",
			inviteCode: "27017",
			checkStatus: "待审核",			
			companyName:"阿里巴巴 "
		}]
	}
	return resdata
}

function search() {
	$('#tab').bootstrapTable('destroy');
	$('#tab').bootstrapTable({
		method: 'get', //请求方式（*）
		url: "/car.do", //请求后台的URL（*）
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
		columns: [{
				field: 'check',
				checkbox: true,
			},
			{
				field: 'name',
				title: '用户名',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'sex',
				title: '性别',
				valign: 'middle'
			}, {
				field: 'tel',
				title: '手机号',
				align: 'center',
				valign: 'middle',
				sortable: true
			}, {
				field: 'IDcard',
				title: '身份证号',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'inviteCode',
				title: '邀请码',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'carType',
				title: '车型',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'checkStatus',
				title: '审核状态',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'companyName',
				title: '公司名称',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'operate',
				title: '操作',
				valign: 'middle',
				formatter: operateFormatter,
				events: operateEvents
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
		'<button class="checkStatus btn btn-success btn-xs">状态审核</button>',
		'<button class="detail btn btn-warning btn-xs">会员详情</button>'
	].join('');
}

////创建模态框变量
var layerIndex;
window.operateEvents = {
	//	修改信息
	"click .edit": function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["修改车辆信息", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "600px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#editCarTable'),
		});
		editVm.getInfo(row)
	},
	//	车辆控制
	"click .control": function(e, value, row, index) {
		$(".controlBtn").attr('data-carid', row.carID);
		layerIndex = layer.open({
			type: 1,
			title: ["车辆控制", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "600px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#carControlTable'),
		});
		controlVm.clickBtn()
	},
	// 车辆详情
	"click .detail": function(e, value, row, index) {
		layerIndex = layer.open({
			type: 1,
			title: ["车辆详情", 'font-size:18px;color:#666'],
			closeBtn: 1,
			area: "600px",
			offset: "55px",
			shadeClose: true,
			skin: 'demo-class',
			content: $('#carDetailTable'),
		});
		showVm.detailShow(row)
	}
}
////-----------------------------------------头部按钮操作---------------------------------
var showAdd = new Vue({
	el: "#content_box",
	data: {
		datas: [],
	},
	methods: {
		//点击查询按钮
		searchBtn: function() {
			search();
		},
		//点击出现新增模态框
		addNew: function() {
			layerIndex = layer.open({
				type: 1,
				title: ["新增会员", 'font-size:18px;color:#666'],
				closeBtn: 1,
				area: "600px",
				offset: "55px",
				shadeClose: true,
				skin: 'demo-class',
				content: $('#addMemberTable'),
			});
			addVm.addApear();
		},
	}
})
//-----------------------------------------新增------------------------------------
//提交新增数据
var addVm = new Vue({
	el: "#addMemberTable",
	data: {
		model: "",
		datas: [],
	},
	methods: {
		addApear: function() {
			
		},
		//	新增车辆提交
		addSubmit: function() {
			
		},
		addClose: function() {
			layer.close(layerIndex)
		}
	}
})

//-----------------------------------------字段操作--------------------------------------------
//function sexFormatter(value, row, index) {
//	var sexStatus;
//	switch(value) {
//		case 1:
//			sexStatus = "男"
//			break;
//		case 2:
//			sexStatus = "女"
//			break;
//	}
//	return sexStatus;
//}
//
//function carTypeFormatter(value, row, index) {
//	var carType;
//	console.log(value)
//	switch(value) {
//		case 1:
//			carType = "K10"
//			break;
//		case 2:
//			carType = "K11"
//			break;
//		case 3:
//			carType = "K12"
//			break;
//		case 4:
//			carType = "K17"
//			break;
//		default:
//			break;
//	}
//	return carType;
//}