package com.demo.ant.sample.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.demo.ant.sample.service.SampleBoardService;
import com.demo.ant.sample.service.SampleService;
import com.demo.ant.sample.vo.SampleBoardVO;
@RequestMapping("/board")
@Controller
public class SampleBoardController {

	private static final Logger log = LoggerFactory.getLogger(SampleBoardController.class);

	 @Autowired
	    private SampleBoardService boardService;
	 	
	 	//글리스트 보기
		@GetMapping("/list")
		public String boardList(Model model) {
			// 게시물 목록 조회 로직 (Service 클래스에서 구현)
			List<SampleBoardVO> boardList = boardService.getBoardList();

			// 게시물 목록을 JSP로 전달
			model.addAttribute("boardList", boardList);

			// 다른 필요한 로직 추가 가능

			return "/board/list"; // JSP 페이지 이름
		}
	    // 게시물 상세 조회 페이지
	    @GetMapping("/{idx}")
	    public String viewBoard(@PathVariable("idx") int idx, Model model) {
	        SampleBoardVO board = boardService.selectBoard(idx);
	        model.addAttribute("board", board);
	        return "/board/detail";
	    }

	    // 게시물 작성 페이지
	    @GetMapping("/create")
	    public String createBoardForm() {
	        return "/board/create";
	    }

	    // 게시물 작성 요청 처리
	    @PostMapping("/create")
	    public String createBoard(@ModelAttribute SampleBoardVO board) {
	        boardService.insertBoard(board);
	        return "redirect:/board/list";
	    }

	    // 게시물 수정 페이지
	    @GetMapping("/{idx}/edit")
	    public String editBoardForm(@PathVariable("idx") int idx, Model model) {
	        SampleBoardVO board = boardService.selectBoard(idx);
	        model.addAttribute("board", board);
	        return "/board/edit";
	    }

	    // 게시물 수정 요청 처리
	    @PostMapping("/{idx}/edit")
	    public String editBoard(@ModelAttribute SampleBoardVO board) {
	        boardService.updateBoard(board);
	        return "redirect:/board/" + board.getIdx();
	    }

	    // 게시물 삭제
	    @PostMapping("/{idx}/delete")
	    public String deleteBoard(@PathVariable("idx") int idx) {
	        boardService.deleteBoard(idx);
	        return "redirect:/board/list"; // 삭제 후 목록 페이지로 리다이렉트
	    }
	
}
