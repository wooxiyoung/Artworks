package com.demo.ant.sample.service;

import java.util.List;

import com.demo.ant.sample.vo.SampleVO;

public interface SampleService {

	public List<SampleVO> selectAtworks() throws Exception;
	public void registerAtworks(SampleVO vo) throws Exception;
	public void updateMember(SampleVO vo);
	public void deleteMember(String userId);
	//회원 상세페이지
	public SampleVO detailMember(String userId);
}
