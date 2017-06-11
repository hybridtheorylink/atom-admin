package com.atom.mvc.controller.base;



import com.atom.mvc.http.Response;
import com.atom.mvc.http.ResponseHeader;
import com.jfinal.core.Controller;

public class BaseController extends Controller{

	
	public Response renderSUC(Object data, Response response, ResponseHeader header) {
		header.setSuccflag(Response.SUCCESS);
		response.setHeader(header);
		response.setData(data);
		return response;
	}
	/**
	 * 返回错误的Response
	 * @param errorCode
	 * @param response
	 * @param header
	 * @return
	 */
	public Response renderFAIL(String errorCode, Response response, ResponseHeader header) {
		return renderFAIL(errorCode,null,response,header);
	}
	public Response renderFAIL(String errorCode, String errorMsg, Response response, ResponseHeader header) {
		header.setSuccflag(Response.FAIL);
		header.setErrorcode(errorCode);
		header.setErrormsg(errorMsg);
		response.setHeader(header);
		return response;
	}  


}

