//加载数据
var wait
$(document).ready(function() {
	var now=new Date();
    var y = now.getFullYear();
    var m = now.getMonth()+1;
    var d = now.getDate();
	var h = now.getHours();
	var min = now.getMinutes();
	var s = now.getSeconds();
	now.setTime(now.getTime()-h*3600*1000-min*60*1000-s*1000-7*24*3600*1000);
	var month = now.getMonth()+1;
	var hh = now.getHours()
	var mm = now.getMinutes()
	var ss = now.getSeconds()	
	if(month<10){
		month = "0" + month; 
	}
	if(m<10){
		m = "0" + m
	}
	if(h<10){
		h="0"+h;
	}
	if(min<10){
		min="0"+min;
	}
	if(s<10){
		s="0"+s;
	}
	var beginTimeStr = now.getFullYear()+"-"+month+"-"+now.getDate()+" "+hh+"0:"+mm+"0:0"+ss;
	var endTimeStr = y+"-"+m+"-"+d+" "+h+":"+min+":"+s;
	$("#beginTime").val(beginTimeStr);
	$("#endTime").val(endTimeStr)
	search()
})

function checkData(res) {
	return res
}

function search() {			
	  $('#tab').bootstrapTable({
        method:'get',//请求方式（*）
        url:"/electricity.do",//请求后台的URL（*）
        cache:false,
        strictSearch:true,
        height:"",
        striped:true,//是否显示行间隔色
        pagination:true,//是否显示分页（*）
        pageSize:10,//每页的记录行数（*）
        pageNumber:1,//初始化加载第一页，默认第一页
        sidePagination:'client', //分页方式：client客户端分页，server服务端分页（*）
        contentType:"application/x-www-form-urlencoded",
        queryParams:queryParams,//传递参数（*）表示每次发送给服务器的参数，可以添加自己需要的参数
        queryParamsType:'undefined', // undefined
        sortable:true,//是否启用排序
        sortName:"ReserveTime",
        sortOrder:"desc",//排序方式
        showColumns:false,
        showRefresh:false,
        search:false,
        responseHandler:checkData,
        columns:[
            {
                field:'check',
                checkbox:true 
            }, {
                field:'OrderNo',
                title:'任务单号',
                valign:'middle',
                sortable:true
            }, {
                field:'CarNo',
                title:'车牌号',
                valign:'middle'
//          }, {
//              field:'SIMNo',
//              title:'SIM卡号',
//              valign:'middle',
//              sortable:true           
//          }, {
//              field:'BluetoothNo',
//              title:'蓝牙编号',
//              valign:'middle',
//              sortable:true                    
            }, {
                field:'ReserveTime',
                title:'预约换电时间',
                valign:'middle',
               // formatter:dateFormatter,
                sortable:true 
            }, {
                field:'BeginTime',
                title:'开始换电时间',
                valign:'middle',
            }, {
                field:'EndTime',
                title:'结束换电时间',
                valign:'middle',
//          }, {
//              field:'TakeBatt1',
//              title:'换电前电池编号1',
//              align:'center',
//              valign:'middle'
//          }, {
//              field:'TakeBatt2',
//              title:'换电前电池编号2',
//              align:'center',
//              valign:'middle'
//          }, {
//              field:'FSOC',
//              title:'换电前SOC(%)',
//              align:'center',
//              valign:'middle'
//          }, {
//              field:'BackBatt1',
//              title:'换电后电池编号1',
//              align:'center',
//              valign:'middle'
//          }, {
//              field:'BackBatt2',
//              title:'换电后电池编号2',
//              align:'center',
//              valign:'middle'
//          }, {
//              field:'BSOC',
//              title:'换电后SOC(%)',
//              align:'center',
//              valign:'middle'
            }, {
                field:'SysUseName',
                title:'换电员姓名',
                align:'center',
                valign:'middle'
            }, {
                field:'TelPhone',
                title:'换电员电话',
                align:'center',
                valign:'middle'
            }, {
            	field:'STATUS',
                title:'任务状态',
                valign:'middle',
//              formatter:StatusFormatter
            }, {
           	 	field: 'operation',
                title: '操作',
                valign:'middle',
//              formatter:operationFormatter,
//              events:operateEvents
            }
        ],
        onLoadSuccess:function(data){
//        	layer.close(loads)
        	//alert("success");   
        },
        onLoadError:function(){
//        	layer.close(loads)
         //  location.reload();
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
		chargeManID:0,
		beginTime:$('#beginTime').val(),
		endTime:$('#endTime').val(),
		order:$('#order').val(),
		status:$('#status').val(), 
		companyID:""
	};
};
//


//添加操作按钮
function operateFormatter(value, row, index) {
	return [
		'<button class="edit btn btn-primary btn-xs">取消预约</button>',
		'<button class="detail btn btn-warning btn-xs">车辆详情</button>'
	].join('');
}