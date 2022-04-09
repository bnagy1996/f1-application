package bredex.f1applicationbackend.dao;

import bredex.f1applicationbackend.entities.AppUser;
import bredex.f1applicationbackend.entities.FormulaTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FormulaTeamDao  extends CrudRepository<FormulaTeam, Long>, QuerydslPredicateExecutor<FormulaTeam> {
    Optional<FormulaTeam> findByName(String name);
    boolean existsByName(String name);
    Page<FormulaTeam> findAll(Pageable pageable);
}
