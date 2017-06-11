package com.atom.mvc.http;

import java.io.Serializable;

public class ResponseHeader implements Serializable {

	private static final long serialVersionUID = 4484940079889230236L;
	private String trdate;     //报文发送日期 格式 yyyy-MM-dd hh:mm:ss
	private String trcode;     //请求方请求的交易码
	private String appseq;     //流水号（随机唯一值，与请求报文流水号对应）
	private Character succflag;//1-成功，2-失败。交易成功与否的判断字段
	private String errorcode;  //01-99(服务端与客户端维护同一份字典

	public String getErrormsg() {
		return errormsg;
	}

	public void setErrormsg(String errormsg) {
		this.errormsg = errormsg;
	}

	private String errormsg;

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

	public Character getSuccflag() {
		return succflag;
	}

	public void setSuccflag(Character succflag) {
		this.succflag = succflag;
	}

	public String getErrorcode() {
		return errorcode;
	}

	public void setErrorcode(String errorcode) {
		this.errorcode = errorcode;
	}

}
