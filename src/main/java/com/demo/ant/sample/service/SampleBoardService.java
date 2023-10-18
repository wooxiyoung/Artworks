package com.demo.ant.sample.service;

import java.util.List;

import com.demo.ant.sample.vo.SampleBoardVO;

public interface SampleBoardService {

	public List<SampleBoardVO> getBoardList();
	public SampleBoardVO selectBoard(int idx);
	public void insertBoard(SampleBoardVO board);
	public void updateBoard(SampleBoardVO board);
	public void deleteBoard(int idx);
}
