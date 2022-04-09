package bredex.f1applicationbackend.config.exception.exceptions;

import org.springframework.http.HttpStatus;

import java.util.Optional;

public class GeneralException extends Exception{
    public Optional<HttpStatus> status;
    public String console_message = "No console message set!";

    public GeneralException(String error){
        super(error);
        status = Optional.empty();
    }

    public GeneralException(String error, String console){
        super(error);
        console_message = console;
        status = Optional.empty();
    }

    public GeneralException(String error, HttpStatus s){
        super(error);
        status = Optional.of(s);
    }
}
