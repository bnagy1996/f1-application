package bredex.f1applicationbackend.config.security.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = NotGreaterThanCurrentLocalDateTimeValidator.class)
@Target(ElementType.FIELD)
@Retention(RUNTIME)
public @interface NotGreaterThanCurrentLocalDateTime {
    String message() default "Date cannot be greater than the current date!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
