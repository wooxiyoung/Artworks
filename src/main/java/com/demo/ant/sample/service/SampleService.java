package com.demo.ant.sample.service;

import java.sql.Date;
import java.util.List;

import com.demo.ant.sample.vo.SampleVO;

public interface SampleService {

	public List<SampleVO> selectAtworks() throws Exception;
	public void registerAtworks(SampleVO vo) throws Exception;
	public void updateMember(SampleVO vo);
	public int deleteMember(String userId);
	//회원 상세페이지
	public SampleVO detailMember(String userId);
	//로그인
	public SampleVO loginMember(SampleVO vo);

}
