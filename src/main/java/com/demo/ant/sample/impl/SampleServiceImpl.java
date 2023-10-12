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

	
}
