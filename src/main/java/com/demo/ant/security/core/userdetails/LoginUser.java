package com.demo.ant.security.core.userdetails;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class LoginUser extends User {
	
	private static final long serialVersionUID = 1L;
	
	private final Map<String, Object> session = new ConcurrentHashMap<String, Object>();
	
	public LoginUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}
	
	public Map<String, Object> getSession () {
		return session;
	}
	
}
