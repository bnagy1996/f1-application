package bredex.f1applicationbackend.mappers;


import bredex.f1applicationbackend.data.formulaone.FormulaTeamData;
import bredex.f1applicationbackend.entities.FormulaTeam;
import org.mapstruct.*;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {UserMapper.class})
public interface FormulaTeamMapper {
    @Mappings({})
    FormulaTeamData mapEntity(FormulaTeam entity);

    @InheritInverseConfiguration
    FormulaTeam mapDTO(FormulaTeamData dto);
}
