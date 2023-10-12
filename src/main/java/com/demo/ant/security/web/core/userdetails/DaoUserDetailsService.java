package com.demo.ant.security.web.core.userdetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class DaoUserDetailsService implements UserDetailsService, LoginUserDetailsService {
    @Autowired
    private LoginUserDetailsService loginUserDetailsService;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
    	return loginUserDetailsService.loadUserByUsername(username);
    }
}
