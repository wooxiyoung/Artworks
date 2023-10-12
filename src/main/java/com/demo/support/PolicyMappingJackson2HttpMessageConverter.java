package com.demo.support;

import java.util.concurrent.atomic.AtomicReference;

import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

public class PolicyMappingJackson2HttpMessageConverter extends MappingJackson2HttpMessageConverter {
    @Override
    public boolean canWrite(Class<?> clazz, MediaType mediaType) {
        System.out.println(clazz);
        System.out.println(mediaType);
        System.out.println("--------------");
        if (!canWrite(mediaType)) {
            return false;
        }
        AtomicReference<Throwable> causeRef = new AtomicReference<Throwable>();
        if (this.objectMapper.canSerialize(clazz, causeRef)) {
            return true;
        }
        logWarningIfNecessary(clazz, causeRef.get());
        return false;
    }

    @Override
    protected boolean canWrite(MediaType mediaType) {
        System.out.println(mediaType);
        for (MediaType supportedMediaType : getSupportedMediaTypes()) {
            System.out.println("supported mediatype = " + supportedMediaType);
            if (supportedMediaType.isCompatibleWith(mediaType)) {
                return true;
            }
        }
        return false;
    }
}
