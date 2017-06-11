package com.atom.mvc.controller;

import java.util.HashMap;
import java.util.Map;

import com.atom.mvc.controller.base.BaseController;
import com.atom.mvc.http.Response;
import com.atom.tools.StringKit;


public class LoginController extends BaseController {
	
	public Response loginByPwd() throws Exception{
		Response response = new Response();
		String phone = getPara("phone"); 
		String pwd = getPara("pwd");
		String sign = getPara("sign");
		String timestamp = getPara("timestamp");
		String uri = getRequest().getRequestURI();
		String signstr = uri + "?phone="+phone+"&pwd="+pwd+"&timstamp="+timestamp;
		if(StringKit.enCodeByMD5(signstr).equals(sign)){
			
		}
	
		Map<String, Object> data = new HashMap<>();	
		
		return renderSUC(data, response, null);
	}
	public Response loginByPhone(){
		
		return null;
	}

}
