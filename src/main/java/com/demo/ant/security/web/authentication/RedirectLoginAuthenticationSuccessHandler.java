package com.demo.ant.security.web.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class RedirectLoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private static final String DEFAULT_TARGET_URL = "/";

    private String defaultTargetUrl;

    public RedirectLoginAuthenticationSuccessHandler () {
        this.defaultTargetUrl = DEFAULT_TARGET_URL;
    }

    public void setDefaultTargetUrl (String defaultTargetUrl) {
        this.defaultTargetUrl = defaultTargetUrl;
    }

    @Override
    public void onAuthenticationSuccess (HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.sendRedirect(defaultTargetUrl);
    }
}
