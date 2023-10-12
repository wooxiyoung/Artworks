package com.demo.ant.security.web.authentication.logout;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

import com.demo.ant.security.web.authentication.event.LogoutSuccessEvent;

@Service
public final class LogoutSuccessEventPublishingLogoutSuccessHandler implements LogoutSuccessHandler, ApplicationEventPublisherAware {
	private ApplicationEventPublisher eventPublisher;

	@Override
	public void onLogoutSuccess (HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		if (this.eventPublisher == null) {
			return;
		}
		if (authentication == null) {
			return;
		}
		this.eventPublisher.publishEvent(new LogoutSuccessEvent(authentication));
	}

	@Override
	public void setApplicationEventPublisher (ApplicationEventPublisher applicationEventPublisher) {
		this.eventPublisher = applicationEventPublisher;
	}
}
