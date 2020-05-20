package org.todomessage.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.todomessage.services.BoardService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class AuthSuccessHandler implements AuthenticationSuccessHandler {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthSuccessHandler.class);
    
    private final ObjectMapper objectMapper;
    private final BoardService boardService;

    @Autowired
    public AuthSuccessHandler(final ObjectMapper objectMapper,
                              final BoardService boardService) {
        this.objectMapper = objectMapper;
        this.boardService = boardService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(boardService.getByName(authentication.getName())));
        out.flush();
        LOGGER.info("Authentication success - Board {}", authentication.getName());
    }
}
