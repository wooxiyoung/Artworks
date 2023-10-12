package com.demo.ant.cmn.util;


import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.http.HttpServletRequest;



public class BeanUtil {

    public static <T> T getBean(String beanName, Class<T> clazz) {
        return ContextFactory.context.getBean(beanName, clazz);
    }


    private enum ContextFactory {
        context;

        private WebApplicationContext wac;

        private ContextFactory() {
            if(wac == null) {
                HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
                wac = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
            }
        }

        private  <T> T getBean(String beanName, Class<T> clazz) {
            return wac.getBean(beanName, clazz);
        }
    }
}
