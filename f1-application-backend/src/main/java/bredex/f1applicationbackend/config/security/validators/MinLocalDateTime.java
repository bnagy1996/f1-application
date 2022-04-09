package bredex.f1applicationbackend.config.security.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = MinLocalDateTimeValidator.class)
@Target(ElementType.FIELD)
@Retention(RUNTIME)
public @interface MinLocalDateTime {
    String message() default "Greater than the allowed minimum date time.";

    String min() default "1900-01-01:00:00:00";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
