package com.demo.ant.sample.service;

import java.util.List;

import com.demo.ant.sample.vo.SampleVO;

public interface SampleService {

	public List<SampleVO> selectAtworks() throws Exception;
	public void registerAtworks(SampleVO vo) throws Exception;
	public void updateMemberPassword(SampleVO vo);
	public void deleteMember(String userId);
}
