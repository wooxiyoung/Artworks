package com.demo.ant.security.web.authentication.dao;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDaoAuthenticationProvider extends DaoAuthenticationProvider {
	@Override
	protected Authentication createSuccessAuthentication (Object principal, Authentication authentication, UserDetails user) {
		UsernamePasswordAuthenticationToken authResult = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), user.getAuthorities());
		authResult.setDetails(user);
		return authResult;
	}
}
