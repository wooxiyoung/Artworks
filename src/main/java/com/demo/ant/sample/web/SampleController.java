package com.demo.ant.sample.web;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.demo.ant.sample.service.SampleService;

@Controller
public class SampleController {

	private static final Logger log = LoggerFactory.getLogger(SampleController.class);

	@Autowired
	SampleService	sampleService;
	
	@GetMapping(value={"/","main"})
	public ModelAndView index(HttpServletRequest req) throws Exception {

		log.info("smapleController index ###");
		
		sampleService.selectAtworks();
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/main/main");
		return mv;
	};
	
}
