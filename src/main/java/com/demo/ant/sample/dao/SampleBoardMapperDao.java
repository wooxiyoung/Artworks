package com.demo.ant.sample.dao;

import java.util.List;

import com.demo.ant.sample.vo.SampleBoardVO;
import com.demo.data.annotation.PrimaryMapperRepository;

@PrimaryMapperRepository
public interface SampleBoardMapperDao {
	public List<SampleBoardVO> getBoardList();
	public SampleBoardVO selectBoard(int idx);
	public void insertBoard(SampleBoardVO board);
	public void updateBoard(SampleBoardVO board);
	public void deleteBoard(int idx);
}
