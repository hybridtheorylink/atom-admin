package com.atom.mvc.controller;

import java.util.Date;
import java.util.UUID;

import com.atom.mvc.controller.base.BaseController;
import com.atom.mvc.http.Response;
import com.atom.mvc.model.Syslog;
import com.atom.plugins.disruptor.DisruptorPlugin;
import com.atom.plugins.disruptor.LogEvent;
import com.lmax.disruptor.RingBuffer;


public class MsgController extends BaseController {
	
	public Response loginByPwd(){
		String phone = getPara("phone"); 
		String pwd = getPara("pwd");
		String sign = getPara("sign");
		String timestamp = getPara("timestamp");
		
		return null;
	}
	
	public void mongo(){
//		MongoQuery query = new 	MongoQuery();
//		List<JSONObject> lists = query.use("test").find();
//		System.out.println(lists.size());
		RingBuffer<LogEvent> buffer = DisruptorPlugin.buffer;
		long next = buffer.next();
		LogEvent log = buffer.get(next);
		Syslog syslog = new Syslog();
		syslog.setId(UUID.randomUUID().toString());
		syslog.setEndtime(new Date());
		log.setLog(syslog);
		buffer.publish(next);		
//		for(int i=0;i<1000;i++){
//			for(int j=0;j<10;j++){
//				Thread t = new Thread(new Runnable() {
//					
//					public void run() {
//						double seed = Math.random();
//						  java.util.Random r=new java.util.Random(10); 
//						long next = buffer.next();
//						LogEvent log = buffer.get(next);
//						log.setLog(new Syslog());
//						buffer.publish(next);
//						
//					}
//				});
//				t.start();
//
//			}
//		}
		renderJson(true);
		
	}


}
