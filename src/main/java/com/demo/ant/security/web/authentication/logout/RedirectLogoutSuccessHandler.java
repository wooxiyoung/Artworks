package com.demo.ant.security.web.authentication.logout;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class RedirectLogoutSuccessHandler implements LogoutSuccessHandler {
    private static final String LOGOUT_TARGET_URL = "/logout";

    private String logoutTargetUrl;

    public RedirectLogoutSuccessHandler () {
        this.logoutTargetUrl = LOGOUT_TARGET_URL;
    }

    public void setLogoutTargetUrl (String logoutTargetUrl) {
        this.logoutTargetUrl = logoutTargetUrl;
    }

    @Override
    public void onLogoutSuccess (HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.sendRedirect(logoutTargetUrl);
    }
    
}
