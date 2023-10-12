package com.demo.ant.security.web.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

//import com.shinhancard.dso.sportal.cmn.util.MessageUtil;

@Service
public class RedirectLoginAuthenticationFailureHandler implements AuthenticationFailureHandler {
    
	private static final String DEFAULT_TARGET_URL = "/loginFail";
	public static final String ERROR_MSG = "LOGIN_ERROR_MSG";
	public static final String ERROR_TYPE = "LOGIN_ERROR_TYPE";
	public static final String USER_NAME = "LOGIN_USER_NAME";
	public static final String USER_PASSWORD = "LOGIN_USER_PASSWORD";
    private String defaultTargetUrl;
    private String usernameParameter;
    private String passwordParameter;

    public RedirectLoginAuthenticationFailureHandler () {
        this.defaultTargetUrl = DEFAULT_TARGET_URL;
    }

    public void setDefaultTargetUrl (String defaultTargetUrl) {
        this.defaultTargetUrl = defaultTargetUrl;
    }
    
    public void setUsernameParameter (String usernameParameter) {
    	this.usernameParameter = usernameParameter;
    }
    
    public void setPasswordParameter (String passwordParameter) {
    	this.passwordParameter = passwordParameter;
    }

    @Override
    public void onAuthenticationFailure (HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
    	String errormsg = "";
    	String errorType = "";
    	Object[] args = new Object[1];
        
		/*
		 * if(exception instanceof UsernameNotFoundException) { args[0] =
		 * "아이디를 다시 확인해 주세요."; errormsg = MessageUtil.getMessage("ERR.MSG999", args);
		 * errorType = "id"; } else if(exception instanceof BadCredentialsException) {
		 * args[0] = "비밀번호를 다시 확인해 주세요."; errormsg =
		 * MessageUtil.getMessage("ERR.MSG999", args); errorType = "passwd"; } else {
		 * System.out.
		 * println("::::::::::::::::: onAuthenticationFailure else :::::::::::::::::");
		 * }
		 */
        
        request.setAttribute(ERROR_MSG, errormsg);
        request.setAttribute(ERROR_TYPE, errorType);
        request.setAttribute(USER_NAME, request.getParameter(usernameParameter));
        request.setAttribute(USER_PASSWORD, request.getParameter(passwordParameter));
        request.getRequestDispatcher(defaultTargetUrl).forward(request, response);
        
        //response.sendRedirect(defaultTargetUrl);
    }
    
}
