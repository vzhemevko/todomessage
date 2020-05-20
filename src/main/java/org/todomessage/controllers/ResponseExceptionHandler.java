package org.todomessage.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ResponseExceptionHandler.class);
    
    @ExceptionHandler(value = { DataIntegrityViolationException.class})
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
        final String message = "Data Integrity Violation";
        LOGGER.warn(message, ex);
        return handleExceptionInternal(ex, message, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }
}
