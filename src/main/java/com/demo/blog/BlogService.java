package com.demo.blog;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.common.model.Blog;
import com.jfinal.plugin.activerecord.Page;

/**
 * 本 demo 仅表达最为粗浅的 jfinal 用法，更为有价值的实用的企业级用法
 * 详见 JFinal 俱乐部: http://jfinal.com/club
 * 
 * BlogService
 * 所有 sql 与业务逻辑写在 Service 中，不要放在 Model 中，更不
 * 要放在 Controller 中，养成好习惯，有利于大型项目的开发与维护
 */
@Service
public class BlogService {
	
	/**
	 * 所有的 dao 对象也放在 Service 中
	 */
	private static final Blog dao = new Blog().dao();
	
	public Page<Blog> paginate(int pageNumber, int pageSize) {
		return dao.paginate(pageNumber, pageSize, "select *", "from blog order by id asc");
	}
	
	public Blog findById(int id) {
		return dao.findById(id);
	}
	
	public void deleteById(int id) {
		dao.deleteById(id);
	}
	@Transactional(readOnly=false)
	public void update(){
		Blog blog = new Blog();
		blog.setTitle("11");
		blog.setContent("11");
		blog.save();
		new Blog().save();
		
	}
}
