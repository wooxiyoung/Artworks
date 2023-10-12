package com.demo.ant.sample.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
		

		//회원리스트 출력
		@GetMapping("/memberlist")
		public ModelAndView index(HttpServletRequest req) throws Exception {
		    log.info("SampleController index ###");

		    List<SampleVO> memberList = sampleService.selectAtworks(); // 회원 정보를 가져옵니다.

		    ModelAndView mv = new ModelAndView();
		    mv.addObject("memberList", memberList); // 회원 정보를 JSP 페이지로 전달합니다.
		    mv.setViewName("/member/memberlist");
		    return mv;
		}
		
		//회원비밀번호수정
		@PostMapping("/updateMemberPassword")
		public String modify(SampleVO vo) {
			sampleService.updateMemberPassword(vo);
			return "redirect:/member/memberlist";
		}
		
		//회원삭제
		@GetMapping("/deleteMember")
		public String deleteMember(@RequestParam("userId") String userId) {
		    sampleService.deleteMember(userId);
		    return "redirect:/member/memberlist";
		}
		
}
