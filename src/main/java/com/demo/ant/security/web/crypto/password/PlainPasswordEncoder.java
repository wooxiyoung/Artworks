package com.demo.ant.security.web.crypto.password;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PlainPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode (CharSequence rawPassword) {
        return rawPassword.toString();
    }

    @Override
    public boolean matches (CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(encode(rawPassword));
    }
}
