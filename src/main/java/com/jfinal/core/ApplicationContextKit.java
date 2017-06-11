package com.jfinal.core;

import java.util.Map.Entry;
import java.util.List;
import java.util.Set;

import javax.servlet.FilterConfig;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Routes.Route;

/**
 * spring 工具箱
 */
public class ApplicationContextKit {

	static ApplicationContext applicationContext;

	/**
	 * 初始化  ApplicationContext
	 */
	static void initApplicationContext(FilterConfig filterConfig) {
		ApplicationContextKit.applicationContext = WebApplicationContextUtils.getWebApplicationContext(filterConfig
				.getServletContext());
		// 断言初始化成功
		Assert.notNull(ApplicationContextKit.applicationContext, "ApplicationContext can not be null");
	}

	/**
	 * 获取 spring bean
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName) {
		// beanName 不能为空
		Assert.notNull(beanName, "beanName can not be null");
		return (T) applicationContext.getBean(beanName);
	}

	/**
	 * 获取 spring bean
	 */
	public static <T> T getBean(Class<T> requiredType) {
		// beanClass 不能为空
		Assert.notNull(requiredType, "requiredType can not be null");
		return applicationContext.getBean(requiredType);
	}

	/**
	 * 注册  Controller
	 */
	static void registerController() {
		List<Route> routes = Config.getRoutes().getRouteItemList();
		for ( Route r : routes) {
			registerController(r.getControllerClass());
		}
	}

	/**
	 * @Title: 向spring容器注册 Controller
	 * @param configClass
	 * @param scope prototype
	 * @return Controller
	 */
	static void registerController(Class<? extends Controller> controllerClass) {
		// beanClass 不能为空
		Assert.notNull(controllerClass, "controllerClass can not be null");
		// 动态注册,每次请求都创建一个实例 符合 jfinal 创建 Controller方式 (jfinal 是每次请求都创建实例).
		registerBean(applicationContext, controllerClass.getName(), BeanDefinition.SCOPE_PROTOTYPE);
	}

	/**
	 * @Title:  向spring容器注册 JFinalConfig
	 * @param configClass 
	 * @param scope singleton
	 */
	static JFinalConfig registerJFinalConfig(String configClass) {
		// beanClass 不能为空
		Assert.notNull(configClass, "configClass can not be null");
		// 动态注册,每次请求都创建一个实例 符合 jfinal 创建 Controller方式 (jfinal 是每次请求都创建实例).
		registerBean(applicationContext, configClass, BeanDefinition.SCOPE_SINGLETON);
		return (JFinalConfig) applicationContext.getBean(configClass);
	}

	/**
	 * @Title: 向spring容器注册bean
	 * @param applicationContext
	 * @param beanName
	 * @param scope 
	 */
	static void registerBean(ApplicationContext applicationContext, String beanName, String scope) {
		// ApplicationContext 不能为空
		Assert.notNull(applicationContext, "ApplicationContext can not be null");
		// scope 不能为空
		Assert.hasText(scope, "scope can not be blank");
		// beanClassName 不能为空
		Assert.hasText(beanName, "beanName can not be blank");
		//		// 断言 bean 没有定义
		//		Assert.state(!applicationContext.containsBean(beanName), "bean [" + beanName + "] is exist.");
		// 防止重复注册
		if (applicationContext.containsBean(beanName)) return;

		// configClass 本身是个 className
		BeanDefinition beanDefinition = genericBeanDefinition(beanName, scope);

		// 注册
		registerBeanDefinition(applicationContext, beanName, beanDefinition);
	}

	/**
	 * @Title: 生成 BeanDefinition
	 * @param beanClassName
	 * @param scope
	 * @return BeanDefinition
	 */
	static BeanDefinition genericBeanDefinition(String beanClassName, String scope) {
		AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder.genericBeanDefinition().getRawBeanDefinition();
		beanDefinition.setScope(scope);
		beanDefinition.setBeanClassName(beanClassName);
		return beanDefinition;
	}

	/**
	 * @Title: 注册 bean 
	 * @param applicationContext
	 * @param beanName
	 * @param beanDefinition 
	 */
	static void registerBeanDefinition(ApplicationContext applicationContext, String beanName, BeanDefinition beanDefinition) {
		ConfigurableApplicationContext configurableApplicationContext = (ConfigurableApplicationContext) applicationContext;
		BeanDefinitionRegistry beanDefinitonRegistry = (BeanDefinitionRegistry) configurableApplicationContext.getBeanFactory();
		beanDefinitonRegistry.registerBeanDefinition(beanName, beanDefinition);
	}
}
