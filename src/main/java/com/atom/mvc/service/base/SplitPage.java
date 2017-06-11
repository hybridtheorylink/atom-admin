package com.atom.mvc.service.base;

import com.jfinal.plugin.activerecord.Record;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 分页封装
 * 
 */
/**
 * @author Will
 *
 */

/**
 * @author Will
 *
 */
public class SplitPage implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = -3209191723137679987L;
	/**
	 * 分页查询参数
	 */
	private Map<String, String> queryParam;// 查询条件
	private String orderColunm;// 排序条件
	private String orderMode;// 排序方式
	private int pageNumber = 1;// 第几页
	private int pageSize = 20;// 每页显示几多

	/**
	 * 分页结果住数据
	 */
	private List<Record> data; // 当前页数据
	private int curPage; // 当前第几页
	private int totalRows; // 总行数
	private String success;//分页是否成功

	/**
	 * 分页显示辅助属性
	 */
	private int totalPage; // 总页数	

	/**
	 * 计算总页数
	 * @return
	 */
	
	public Map<String, String> getQueryParam() {
		return queryParam;
	}

	public void setQueryParam(Map<String, String> queryParam) {
		this.queryParam = queryParam;
	}

	public String getOrderColunm() {
		return orderColunm;
	}

	public void setOrderColunm(String orderColunm) {
		this.orderColunm = orderColunm;
	}

	public String getOrderMode() {
		return orderMode;
	}

	public void setOrderMode(String orderMode) {
		this.orderMode = orderMode;
	}

	/**
	 * 需要查询显示第几页
	 * @return
	 */
	public int getPageNumber() {
		if (pageNumber <= 0) {
			pageNumber = 1;
		}
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	/**
	 * 每页显示多少条数据
	 * @return
	 */
	public int getPageSize() {
		if (pageSize <= 0) {
			pageSize = 1;
		}
		if (pageSize > 200) {
			pageSize = 20;
		}
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<Record> getData() {
		return data;
	}

	public void setData(List<Record> data) {
		this.data = data;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getTotalRows() {
		return totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}
	
	



}
