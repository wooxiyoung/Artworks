package com.demo.ant.sample.dao;

import java.util.List;

import com.demo.ant.sample.vo.SampleVO;
import com.demo.data.annotation.PrimaryMapperRepository;

@PrimaryMapperRepository
public interface SampleMapperDao {
	
	public List<SampleVO> selectAtworks() throws Exception;
	public void registerAtworks(SampleVO vo) throws Exception;
	public void updateMemberPassword(SampleVO gvo);
	public void deleteMember(String userId);
}
