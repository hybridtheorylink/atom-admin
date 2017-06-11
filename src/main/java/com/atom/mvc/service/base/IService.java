package com.atom.mvc.service.base;

import com.atom.mvc.http.Request;
import com.atom.mvc.http.Response;
import com.atom.mvc.http.ResponseHeader;

/**
 * @author HSW
 *
 */
public interface IService {
  /**
   * @param request
   * @param response
   * @param header
   * @param method
   * @return
 * @throws Exception 
   */
  public Response excute(Request request, Response response, ResponseHeader header, String method) throws Exception;
  
 
}
