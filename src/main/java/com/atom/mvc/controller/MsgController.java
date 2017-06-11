package com.atom.mvc.controller;

import com.atom.mvc.controller.base.BaseController;
import com.atom.mvc.http.Response;


public class MsgController extends BaseController {
	
	public Response loginByPwd(){
		String phone = getPara("phone"); 
		String pwd = getPara("pwd");
		String sign = getPara("sign");
		String timestamp = getPara("timestamp");

		
		
		return null;
	}


}
