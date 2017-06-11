package com.atom.mvc.service;


import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.atom.mvc.http.Request;
import com.atom.mvc.http.Response;
import com.atom.mvc.http.ResponseHeader;
import com.atom.mvc.service.base.BaseService;
import com.atom.mvc.service.base.IService;
import com.demo.common.model.Blog;


/**
 * 测试service
 * @author hsw
 */
@Service
public class TestService extends BaseService implements IService{
	@Transactional(readOnly=false)
	public Response excute(Request request, Response response, ResponseHeader header, String method) throws Exception {
		Blog blog = new Blog();
		blog.setContent("111");
		blog.setTitle("111");
		blog.save();
		new Blog().save();
		
		Map<String, Object> result = new HashMap<>();
    	return renderSUC(result, response, header);
    }
	
}

    


