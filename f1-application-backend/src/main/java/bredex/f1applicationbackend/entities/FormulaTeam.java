package bredex.f1applicationbackend.entities;

import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@SequenceGenerator(name="seq", initialValue=100, allocationSize=100)
public class FormulaTeam {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq")
    Long id;
    @Column(unique=true)
    String name;
    LocalDateTime foundationDate;
    Integer numberOfConstructorWins;
    Boolean isPaymentDue;

    public static void validateSortBy(String sort) throws GeneralException {
        Boolean validSort = List.of(
                QFormulaTeam.formulaTeam.name.getMetadata().getName(),
                QFormulaTeam.formulaTeam.foundationDate.getMetadata().getName(),
                QFormulaTeam.formulaTeam.numberOfConstructorWins.getMetadata().getName()).stream().anyMatch(o -> o.compareTo(sort)==0);

        if(!validSort || sort == null){
            throw new GeneralException("Not a valid sort value for FormulaTeam: " + sort);
        }
    }
}
