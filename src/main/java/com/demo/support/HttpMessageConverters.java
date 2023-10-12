package com.demo.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.converter.HttpMessageConverter;

@SuppressWarnings("serial")
public class HttpMessageConverters extends ArrayList<HttpMessageConverter<?>> {
    public HttpMessageConverters( List<HttpMessageConverter<?>> converters ) {
        super( converters );
    }
}
