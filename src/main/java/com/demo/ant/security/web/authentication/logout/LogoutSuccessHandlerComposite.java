package com.demo.ant.security.web.authentication.logout;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class LogoutSuccessHandlerComposite implements LogoutSuccessHandler {
	private List<LogoutSuccessHandler> logoutHandlers;
	
	private LogoutSuccessHandlerComposite (List<LogoutSuccessHandler> logoutHandlers) {
		this.logoutHandlers = logoutHandlers;
	}
	
	@Override
	public void onLogoutSuccess (HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		for (LogoutSuccessHandler logutHandler : logoutHandlers) {
			logutHandler.onLogoutSuccess(request, response, authentication);
		}
	}
}
