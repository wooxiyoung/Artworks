package com.demo.ant.security.web.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

public class LoginAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {
    private static final String USERNAME_PARAMETER = "username";

    private static final String PASSWORD_PARAMETER = "password";

    private static final String DEFAULT_FILTER_PROCESSES_URL = "/login";

    private String usernameParameter = USERNAME_PARAMETER;

    private String passwordParameter = PASSWORD_PARAMETER;

    public LoginAuthenticationProcessingFilter () {
        this(DEFAULT_FILTER_PROCESSES_URL);
    }
    protected LoginAuthenticationProcessingFilter (String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication (HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        String username = request.getParameter(usernameParameter);
        String password = request.getParameter(passwordParameter);
        UsernamePasswordAuthenticationToken preAuth = new UsernamePasswordAuthenticationToken(username, password);
        return getAuthenticationManager().authenticate(preAuth);
    }

    public void setObtainUsernameParameter (String usernameParameter) {
        this.usernameParameter = usernameParameter;
    }

    public void setObtainPasswordParameter (String passwordParameter) {
        this.passwordParameter = passwordParameter;
    }
}
