package bredex.f1applicationbackend.config.security.validators;

import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;
import java.util.Map;

public class SortDirectionValidator  implements ConstraintValidator<SortDirection, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext ctx) {
        return List.of("asc","desc").stream().anyMatch(o -> o.compareTo(value)==0);
    }
}
