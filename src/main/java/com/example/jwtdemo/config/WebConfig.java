package com.example.jwtdemo.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${userAlbumEndpoint}")
    private String userAlbumEndpoint;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/public", "classpath:/static/")
                .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)));

        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:src/main/resources/static/images/")
                .setCacheControl(CacheControl.noCache());

        registry.addResourceHandler("/" + userAlbumEndpoint + "/**")
                .addResourceLocations("file:src/main/resources/static/albums/")
                .setCacheControl(CacheControl.noCache());
    }

//    @Bean
//    public ObjectMapper getMapper() {
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
//        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
//        return mapper;
//    }
}
