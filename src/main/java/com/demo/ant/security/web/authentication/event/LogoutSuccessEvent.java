package com.demo.ant.security.web.authentication.event;

import org.springframework.security.authentication.event.AbstractAuthenticationEvent;
import org.springframework.security.core.Authentication;

@SuppressWarnings("serial")
public class LogoutSuccessEvent extends AbstractAuthenticationEvent {
	public LogoutSuccessEvent (Authentication authentication) {
		super(authentication);
	}
}
