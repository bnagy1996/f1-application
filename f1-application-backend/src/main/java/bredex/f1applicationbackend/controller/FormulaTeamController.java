package bredex.f1applicationbackend.controller;

import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;
import bredex.f1applicationbackend.config.security.validators.SortDirection;
import bredex.f1applicationbackend.data.Success;
import bredex.f1applicationbackend.data.formulaone.FormulaTeamData;
import bredex.f1applicationbackend.entities.FormulaTeam;
import bredex.f1applicationbackend.services.FormulaOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;

@RestController
@Validated
@RequestMapping("/team")
public class FormulaTeamController {

    @Autowired
    private FormulaOneService formulaOneService;

    @GetMapping
    public ResponseEntity<?> getTeams(@RequestParam @Min(0) Integer page, @RequestParam @Min(0) Integer size, @RequestParam String sort,@RequestParam @SortDirection String asc) throws GeneralException {
        FormulaTeam.validateSortBy(sort);
        Pageable paging  = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(asc),sort));
        return ResponseEntity.ok(formulaOneService.getFormulaTeams(paging));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addFormulaTeam(@Validated @RequestBody FormulaTeamData data) throws GeneralException {
        formulaOneService.addFormulaTeam(data);
        return ResponseEntity.ok(new Success("Successful!"));
    }

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateFormulaTeam(@RequestParam Long id,@Validated @RequestBody FormulaTeamData data) throws GeneralException {
        formulaOneService.updateFormulaTeam(id, data);
        return ResponseEntity.ok(new Success("Successful!"));
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteNews(@RequestParam Long id) throws GeneralException {
        formulaOneService.deleteFormulaTeam(id);
        return ResponseEntity.ok(new Success("Successful!"));
    }
}
