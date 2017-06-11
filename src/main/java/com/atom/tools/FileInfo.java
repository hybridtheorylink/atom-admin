package com.atom.tools;

import com.sun.net.httpserver.Authenticator.Success;

public class FileInfo {
	public static final String TYPE_IMG ="IMAGE";
	public static final String TYPE_FILE ="FILE";
	public static final String TYPE_MEDIA ="MEDIA";
	public static final String TYPE_EXCEL ="EXCEL";
	private String type;
	private long size;
	private String path;
	private String name;
	private String oringinName;
	private boolean success;
	private String message;
	private String relatePath;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFullPath() {
		return this.path +"/"+name;
	}
	public String getOringinName() {
		return oringinName;
	}
	public void setOringinName(String oringinName) {
		this.oringinName = oringinName;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getRelatePath() {
		return relatePath;
	}
	public void setRelatePath(String relatePath) {
		this.relatePath = relatePath;
	}
	

	

	
	
	

}
