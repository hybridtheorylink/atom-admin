package com.atom.mvc.http;

import java.io.Serializable;

public class Response implements Serializable {

	private static final long serialVersionUID = -4858092338118786041L;
	private ResponseHeader header;
	private Object data;
	
	public static final Character SUCCESS = '1';		//成功
	public static final Character FAIL = '2';			//失敗

	public ResponseHeader getHeader() {
		return header;
	}

	public void setHeader(ResponseHeader header) {
		this.header = header;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
