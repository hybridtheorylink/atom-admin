package com.atom.mvc.http;


import java.io.Serializable;

public class RequestHeader implements Serializable {

	private static final long serialVersionUID = -5498639102916146580L;

	private String trdate;//报文发送日期 格式 yyyy-MM-dd hh:mm:ss
	private String trcode;//请求方请求的交易码
	private String uuid;//请求用户ID
	private String appseq;//流水号（随机唯一值，与请求报文流水号对应）
	private boolean html5;//判断是否是html5 框架的 jsonp请求

	private String ip;

	private String openid;

	public boolean isHtml5() {
		return html5;
	}

	public void setHtml5(boolean html5) {
		this.html5 = html5;
	}

	public String getTrdate() {
		return trdate;
	}

	public void setTrdate(String trdate) {
		this.trdate = trdate;
	}

	public String getTrcode() {
		return trcode;
	}

	public void setTrcode(String trcode) {
		this.trcode = trcode;
	}


	public String getAppseq() {
		return appseq;
	}

	public void setAppseq(String appseq) {
		this.appseq = appseq;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
}
