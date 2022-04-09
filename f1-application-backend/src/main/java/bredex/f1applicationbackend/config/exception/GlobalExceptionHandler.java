package bredex.f1applicationbackend.config.exception;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;


import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler{
	
	private static Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((error) -> {
			// String fieldName = ((FieldError) error).getField();
			String fieldName = "snack";
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}

    @ExceptionHandler(value = GeneralException.class )
    protected ResponseEntity<Map<String, String>> handleException(GeneralException e, HttpServletRequest request) {
        log.error("GeneralException:: "+e.getMessage());
        Map<String, String> errors = new HashMap<>();
        errors.put("snack", e.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

	@ExceptionHandler(value = AuthenticationException.class )
	protected ResponseEntity<Map<String, String>> handleException(AuthenticationException e, HttpServletRequest request) {
		log.error("GeneralException:: "+e.getMessage());
		Map<String, String> errors = new HashMap<>();
		errors.put("snack", e.getMessage());
		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}






}