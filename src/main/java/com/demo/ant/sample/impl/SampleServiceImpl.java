package com.demo.ant.sample.impl;


import java.sql.Date;
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
	public void updateMember(SampleVO vo) {
		dao.updateMember(vo);
	}
	
	//화원삭제
	 @Override
	 public int deleteMember(String userId) {
			return dao.deleteMember(userId);
		}
	
	//회원상세페이지
	@Override
	public SampleVO detailMember(String userId) {
		return dao.detailMember(userId);
	}
	
	//로그인
	@Override
	public SampleVO loginMember(SampleVO vo) throws Exception {
		return dao.loginMember(vo);
	}
	
}
