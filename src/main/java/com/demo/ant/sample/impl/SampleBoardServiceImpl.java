package com.demo.ant.sample.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.ant.sample.dao.SampleBoardMapperDao;
import com.demo.ant.sample.service.SampleBoardService;
import com.demo.ant.sample.vo.SampleBoardVO;

@Service("sampleBoardService")
public class SampleBoardServiceImpl implements SampleBoardService{

	@Autowired
	SampleBoardMapperDao	boardDAO;
	
	
	@Override
    public SampleBoardVO selectBoard(int idx) {
        return boardDAO.selectBoard(idx);
    }

    @Override
    public void insertBoard(SampleBoardVO board) {
        boardDAO.insertBoard(board);
    }

    @Override
    public void updateBoard(SampleBoardVO board) {
        boardDAO.updateBoard(board);
    }

    @Override
    public void deleteBoard(int idx) {
        boardDAO.deleteBoard(idx);
    }
    
    @Override
    public List<SampleBoardVO> getBoardList() {
        return boardDAO.getBoardList();
    }
	
}
