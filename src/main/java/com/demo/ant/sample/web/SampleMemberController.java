package com.demo.ant.sample.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
			
			return "/main/main";
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
		
		//회원상세페이지로 이동
		@GetMapping("/detailMember")
		public String detailMember(@RequestParam("userId") String userId, Model model) {
		    // userId를 이용하여 회원 상세 정보를 가져오는 로직을 작성
		    // 예를 들면, sampleService.detailMember(userId)를 사용하여 회원 정보를 가져옴
		    // 가져온 회원 정보는 모델에 추가하여 뷰에서 사용

		    // 예시 코드:
		    SampleVO member = sampleService.detailMember(userId);
		    model.addAttribute("member", member);

		    return "/member/detailMember"; // detailMember 페이지로 이동
		}
		
		//회원정보수정
		@PostMapping("/updateMember")
		public String updateMember(SampleVO vo) {
			log.info("updateMember로그확인 " + vo.toString());
		    sampleService.updateMember(vo);
		    return "redirect:/member/memberlist";
		}
		//회원삭제
	//	@GetMapping("/deleteMember")
	//	public String deleteMember(@RequestParam("userId") String userId) {
	//	    sampleService.deleteMember(userId);
	//	    return "redirect:/member/memberlist";
	//	}
		
		@RequestMapping(value = "/deleteMember", method = RequestMethod.POST)
		public String deleteMember(@RequestParam("delete_user_ids") String[] delete_user_ids, ModelMap modelMap) throws Exception {
			// 삭제할 사용자 ID마다 반복해서 사용자 삭제
			for (String userId : delete_user_ids) {
				System.out.println("사용자 삭제 = " + userId);
				int delete_count = sampleService.deleteMember(userId);
			}
			// 목록 페이지로 이동
			return "redirect:/member/memberlist";
		}
		
		
		//로그인
		@GetMapping("/login")
		public String getlogin() throws Exception {
			return "/member/login";
		}
		
		
		@RequestMapping(value = "/login", method = RequestMethod.POST)
		public String login(SampleVO vo, HttpServletRequest req, RedirectAttributes rttr) throws Exception{
			log.info("post login");
			
			HttpSession session = req.getSession();
			SampleVO login = sampleService.loginMember(vo);
			log.info("login멤버확인 " + vo.toString());
			if(login == null) {
				session.setAttribute("loginMember", null);
				rttr.addFlashAttribute("msg", false);
			}else {
				session.setAttribute("loginMember", login);
			}
			
			return "redirect:/";
		}
		
		@RequestMapping(value = "/logout", method = RequestMethod.GET)
		public String logout(HttpSession session) throws Exception{
			
			session.invalidate();
			
			return "redirect:/";
		}
		
		
}
