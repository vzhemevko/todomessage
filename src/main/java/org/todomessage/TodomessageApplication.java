package org.todomessage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableScheduling
@EnableWebSecurity
@SpringBootApplication
public class TodomessageApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodomessageApplication.class, args);
    }

    @PostConstruct
    public void init(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}
