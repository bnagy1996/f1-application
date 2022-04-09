package bredex.f1applicationbackend.dao;

import bredex.f1applicationbackend.entities.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserDao extends CrudRepository<AppUser, Long>, QuerydslPredicateExecutor<AppUser> {
    Optional<AppUser> findByUsername(String username);
    Boolean existsByUsername(String username);
    List<AppUser> findAll();
    //Page<AppUser> findAll(Predicate predicate, Pageable pageable);
}
