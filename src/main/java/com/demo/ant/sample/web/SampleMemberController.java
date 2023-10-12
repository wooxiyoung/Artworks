package com.demo.ant.sample.web;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.demo.ant.sample.service.SampleService;
import com.demo.ant.sample.vo.SampleVO;
@RequestMapping("/member")
@Controller
public class SampleMemberController {

	private static final Logger log = LoggerFactory.getLogger(SampleController.class);

	@Autowired
	SampleService	sampleService;
	
		// 회원가입 get
		@GetMapping("/register")
		public String getRegister() throws Exception {
			return "/member/register";
		}
		
		// 회원가입 post
		@PostMapping("/register")
		public String postRegister(SampleVO vo) throws Exception {
			
			sampleService.registerAtworks(vo);
			
			return "/member/register";
		}
	
}
