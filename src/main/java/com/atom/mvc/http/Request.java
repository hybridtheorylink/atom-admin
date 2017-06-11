package com.atom.mvc.http;

import java.io.Serializable;
import java.util.Map;


public class Request implements Serializable {

	public static final String POST = "POST";
	public static final String GET = "GET";
	private static final long serialVersionUID = 6611790915516702041L;

	private RequestHeader header;
	private Map<String,Object> data;
	

	public RequestHeader getHeader() {
		return header;
	}

	public void setHeader(RequestHeader header) {
		this.header = header;
	}

	public Map<String,Object> getData() {
		return data;
	}

	public void setData(Map<String,Object> data) {
		this.data = data;
	}


}
