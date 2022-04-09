package bredex.f1applicationbackend.config.security.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;


@Documented
@Constraint(validatedBy = SortDirectionValidator.class)
@Target(ElementType.PARAMETER)
@Retention(RUNTIME)
public @interface SortDirection {
    String message() default "Incorrect sort direction!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
