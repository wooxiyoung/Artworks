package com.demo.ant.sample.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.ant.sample.dao.SampleMapperDao;
import com.demo.ant.sample.service.SampleService;
import com.demo.ant.sample.vo.SampleVO;

@Service("sampleService")
public class SampleServiceImpl implements SampleService{

	@Autowired
	SampleMapperDao	dao;
	
	@Override
	public List<SampleVO> selectAtworks() throws Exception {
		return dao.selectAtworks();
	}
	
	//회원등록
	@Override
	public void registerAtworks(SampleVO vo) throws Exception {
		dao.registerAtworks(vo);
		
	}
	
	//회원정보변경
	@Override
	public void updateMemberPassword(SampleVO gvo) {
		dao.updateMemberPassword(gvo);
	}
	
	//화원삭제
	@Override
	public void deleteMember(String userId) {
		dao.deleteMember(userId);
	}
}
