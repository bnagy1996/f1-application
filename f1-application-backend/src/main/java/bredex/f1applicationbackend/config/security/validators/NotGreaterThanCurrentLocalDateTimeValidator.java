package bredex.f1applicationbackend.config.security.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class NotGreaterThanCurrentLocalDateTimeValidator implements ConstraintValidator<NotGreaterThanCurrentLocalDateTime, LocalDateTime> {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public boolean isValid(LocalDateTime value, ConstraintValidatorContext ctx) {
        return value.isBefore(LocalDateTime.now());
    }
}
