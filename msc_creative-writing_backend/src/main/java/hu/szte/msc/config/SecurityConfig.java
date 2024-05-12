package hu.szte.msc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.google.firebase.auth.FirebaseAuth;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    private final FirebaseAuth firebaseAuth;

    @Autowired
    public SecurityConfig(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()
                        /*.requestMatchers(HttpMethod.POST, "/api/login")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/**")
                        .authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/**")
                        .authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/**")
                        .authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/api/**")
                        .authenticated()
                        .requestMatchers(HttpMethod.OPTIONS, "/api/**")
                        .permitAll()*/
                ).addFilterBefore(new FirebaseTokenFilter(firebaseAuth), BasicAuthenticationFilter.class);

        return http.build();
    }
    
}
