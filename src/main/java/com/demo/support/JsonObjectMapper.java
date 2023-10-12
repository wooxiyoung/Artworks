package com.demo.support;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SuppressWarnings("serial")
public class JsonObjectMapper extends JsonMapper {
    public JsonObjectMapper () {
        super();
        configure( SerializationFeature.INDENT_OUTPUT, true );
        configure( DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true );
        configure( DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false );
        setSerializationInclusion( Include.NON_NULL );
        registerModule( new JavaTimeModule() );
    }
}
