package com.example.jwtdemo.config;

import com.example.jwtdemo.filters.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${userAlbumEndpoint}")
    private String userAlbumEndpoint;

    private final JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorizeHttpRequests) ->
                        authorizeHttpRequests
                                .requestMatchers("/register", "/authenticate").permitAll()
                                .requestMatchers(HttpMethod.GET, "/threads", "/threads/**").permitAll()
                                .requestMatchers("/upload").permitAll() // TODO change access
                                .requestMatchers("/bird").permitAll() // TODO change access
                                .requestMatchers("/images/**").permitAll()
                                .requestMatchers("/resources/**").permitAll()
                                .requestMatchers("/" + userAlbumEndpoint + "/**").permitAll()
                                .requestMatchers("/identify").permitAll()
                                .requestMatchers(HttpMethod.POST, "/threads").authenticated()
                                .anyRequest().authenticated()
                )
                .cors(Customizer.withDefaults())
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionConcurrency((sessionConcurrency) ->
                                sessionConcurrency
                                        .maximumSessions(1)
                                        .expiredUrl("/login?expired")))
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // for jwt
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowedMethods("GET", "DELETE", "PUT", "POST");
                registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
                registry.addMapping("/posts/**").allowedOrigins("http://localhost:3000").allowedMethods("GET", "DELETE", "PUT", "POST");
                registry.addMapping("/posts").allowedOrigins("http://localhost:3000").allowedMethods("GET", "DELETE", "PUT", "POST");
                registry.addMapping("/upload").allowedOrigins("http://localhost:3000");
                registry.addMapping("/score").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
