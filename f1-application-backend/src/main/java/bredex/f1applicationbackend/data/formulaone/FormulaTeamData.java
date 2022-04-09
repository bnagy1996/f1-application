package bredex.f1applicationbackend.data.formulaone;

import bredex.f1applicationbackend.config.security.validators.MinLocalDateTime;
import bredex.f1applicationbackend.config.security.validators.NotGreaterThanCurrentLocalDateTime;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FormulaTeamData {
    public Long id;
    @NotEmpty @NotNull
    public String name;
    @NotNull
    @MinLocalDateTime
    @NotGreaterThanCurrentLocalDateTime
    public LocalDateTime foundationDate;
    @NotNull
    @Min(0)
    public Integer numberOfConstructorWins;
    public Boolean isPaymentDue;
}
