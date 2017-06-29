//加载数据
$(document).ready(function() {
	search()
})

function checkData(res) {
	console.log(res)
	return res
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
		columns: [{
				field: 'check',
				checkbox: true,
			},
			{
				field: 'carNo',
				title: '车牌号',
				valign: 'middle',
				sortable: true,
			}, {
				field: 'str',
				title: '车型',
				valign: 'middle',
				formatter: function(value, row) {
					var str = "";
					var people = row.people;
					var modelName = row.modelName;
					var alias = row.alias;
					if('' != people && '' != modelName && '' != alias) {
						str += row.alias + row.modelName + "&nbsp;" + row.people + "座";
					}
					return str;
				}
			}, {
				field: 'createTime',
				title: '创建时间',
				align: 'center',
				valign: 'middle',
				sortable: true
			}, {
				field: 'companyShortName',
				title: '所属公司',
				align: 'center',
				valign: 'middle',
			}, {
				field: 'carRentStatus',
				title: '租车状态',
				align: 'center',
				valign: 'middle',
				formatter: carRentStatusFormatter
			}, {
				field: 'carStatus',
				title: '车辆状态',
				align: 'center',
				valign: 'middle',
				formatter: carStatusFormatter
			}, {
				field: 'electricity',
				title: '剩余电量(%)',
				align: 'center',
				valign: 'middle'
			}, {
				field: 'remainKON',
				title: '剩余里程(KM)',
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
		'<button class="control btn btn-success btn-xs">车辆控制</button>',
		'<button class="detail btn btn-warning btn-xs">车辆详情</button>'
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
				title: ["新增车辆", 'font-size:18px;color:#666'],
				closeBtn: 1,
				area: "600px",
				offset: "55px",
				shadeClose: true,
				skin: 'demo-class',
				content: $('#addCarTable'),
			});
			addVm.addApear();
		},
		//批量导入
		importBtn: function(){
			var datas ={
				uploadFile:$(".selectFile").val(),
				companyID:$.cookie("companyID"),
				operatorID:$.cookie("operatorID")
			}
			$.ajax({
				type:"post",
				url:"../../car/importCar.do",
				data:datas,
				cache:false,
				success:function(resdata){
					if(!resdata.msg){
						layer.msg("成功导入"+resdata.data+"条数据")
					}else{
						layer.msg("成功导入"+resdata.data+"条数据，第"+msg+"条数据格式有误")
					}
				},
				error:function(){
					layer.msg("服务器异常，请稍后重试")
				}
			})
			console.log("批量导入")
		},
		//导出按钮
		exportBtn: function() {
			console.log("导出表单")
		}
	}
})
//-----------------------------------------新增------------------------------------
//提交新增数据
var addVm = new Vue({
	el: "#addCarTable",
	data: {
		model: "",
		datas: [],
	},
	methods: {
		addApear: function() {
			var dataStr = {
				carModel: "",
				carColor: "",
				carNo: "",
				carVin: "",
				people: "",
				terminalNo: "",
				SIMNo: "",
				bluetoothNo: "",
				checkMenID: "",
				remark: "",
				carLicense: "",
				carIcon: "",
				operatorID: ""
			}
			//获取车型
			var getModelData = {
				companyID: $.cookie("companyID"),
			}
			$.ajax({
				type: "post",
				url: "../../car/loadAllCarModel.do",
				data: getModelData,
				cache:false,
				dataType: "json",
				success: function(resdata) {
					dataStr.carModel = resdata.data
				},
				error: function() {
					layer.msg("车辆型号获取失败")
				}
			})
			this.datas = dataStr;
		},
		//	新增车辆提交
		addSubmit: function() {
			var datas = JSON.parse(JSON.stringify(this.datas));
			datas.carLicense = $("#carLicense").val();
			datas.carIcon = $("#carIcon").val();
			datas.operatorID = $.cookie("operatorID");
			datas.carModel = this.model
			console.log(datas)
			$.ajax({
				type: "post",
				url: "../../car/addCar.do",
				data: datas,
				cache:false,
				dataType: "json",
				success: function(resdata) {
					layer.close(layerIndex)
					layer.msg("添加成功");
					$("#tab").bootstrapTable("refresh");
					console.log(resdata);
				},
				error: function() {
					layer.msg("服务器异常，请稍后重试")
				}
			})
		},
		addClose: function() {
			layer.close(layerIndex)
		}
	}
})
//----------------------------------------修改信息-----------------------------------------------
//修改信息
var editVm = new Vue({
	el: "#editCarTable",
	data: {
		model: "",
		datas: [],
	},
	methods: {
		getInfo: function(obj) {
			var dataStr = JSON.parse(JSON.stringify(obj));
			dataStr.carModel = "";
			dataStr.carColor = "";
			var getModelData = {
				companyID: "2"
			}
//			获取车辆型号
			$.ajax({
				type: "post",
				url: "../../car/loadAllCarModel.do",
				data: getModelData,
				dataType: "json",
				cache:false,
				success: function(resdata) {
					dataStr.carModel = resdata.data
				},
				error: function() {
					layer.msg("车辆型号获取失败")
				}
			})
			this.datas = dataStr;
		},
		editSubmit: function() {
			var dataStr = JSON.parse(JSON.stringify(this.datas));
			dataStr.carModel = this.model;
			$.ajax({
				type: "post",
				url: "../../car/changeCarInfo.do",
				data: dataStr,
				dataType: "json",
				cache:false,
				success: function(resdata) {
					console.log(resdata)
					layer.close(layerIndex)
					layer.msg("修改成功");
					$("#tab").bootstrapTable("refresh");
				},
				error: function() {
					layer.msg("信息修改失败")
				}
			})
			//			console.log(JSON.stringify())
		},
//关闭编辑模态框
		editClose: function() {
			layer.close(layerIndex)
		}
	}
})
//----------------------------------------车辆控制------------------------------------------------
var controlVm = new Vue({
	el: "#carControlTable",
	data: {
		datas: []
	},
	methods: {
		clickBtn: function() {
			$(".controlBtn").click(function() {
				var controlData = {
					operatorID: $.cookie("operatorID"),
					carID: $(this).attr("data-carid"),
					controlType: $(this).val()
				};
				console.log(controlData)
				$.ajax({
					type: "post",
					url: "../../car/carControl.do",
//					url:"/company.do",
					data: controlData,
					dataType: "json",
					cache:false,
					success: function(resdata) {
						console.log(resdata)
						var data = resdata.status;
						if(data == "0") {
							layer.msg("操作成功!");
							return;
						} else if(data == "101") {
							layer.msg("操作超时!");
							return;
						} else if(data == "102") {
							layer.msg("该车不支持操控!");
							return;
						} else if(data == "103") {
							layer.msg("找不到车辆!");
							return;
						} else if(data == "104") {
							layer.msg("车辆无VIN码!");
							return;
						} else if(data == "105") {
							layer.msg("终端执行失败!");
							return;
						} else if(data == "106") {
							layer.msg("车辆正在行驶或者状态不明，不允许控制!");
							return;
						} else if(data == "302") {
							layer.msg("找不到该车辆!");
							return;
						}
					},
					error: function() {
						layer.msg("服务器异常，请稍后重试")
					}
				})
			})
		},
		controlClose: function() {
			layer.close(layerIndex)
		}
	}
})
//------------------------------------------------显示车辆详情----------------------------------------
//显示车辆详情
var showVm = new Vue({
	el: "#carDetailTable",
	data: {
		datas: []
	},
	methods: {
		detailShow: function(obj) {
			this.datas = obj;
		},
		detailClose: function() {
			layer.close(layerIndex)
		}
	}
})
//-----------------------------------------------字段操作----------------------------------------
//租用状态字段转换
function carRentStatusFormatter(value, row, index) {
	var carRentStatus;
	switch(value) {
		case 1:
			carRentStatus = "空闲"
			break;
		case 2:
			carRentStatus = "预约中"
			break;
		case 3:
			carRentStatus = "租用中"
			break;
		default:
			break;
	}
	return carRentStatus;
}
//车辆状态字段转换
function carStatusFormatter(value, row, index) {
	var carStatus;
	switch(value) {
		case 1:
			carStatus = "启用"
			break;
		case 2:
			carStatus = "暂停"
			break;
		case 3:
			carStatus = "自动下线"
			break;
		case 4:
			carStatus = "维修"
			break;
		case 5:
			carStatus = "保养"
			break;
		case 6:
			carStatus = "报废"
			break;
		default:
			break;
	}
	return carStatus;
}