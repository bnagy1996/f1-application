package bredex.f1applicationbackend.config.security.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MinLocalDateTimeValidator   implements ConstraintValidator<MinLocalDateTime, LocalDateTime> {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd:HH:mm:ss");
    String min;

    @Override
    public void initialize(MinLocalDateTime annotation) {
        min = annotation.min();
    }

    @Override
    public boolean isValid(LocalDateTime value, ConstraintValidatorContext ctx) {
        LocalDateTime dateTime = LocalDateTime.parse(min, formatter);
        return value.isAfter(dateTime);
    }
}