package bredex.f1applicationbackend.services;

import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;
import bredex.f1applicationbackend.dao.FormulaTeamDao;
import bredex.f1applicationbackend.dao.UserDao;
import bredex.f1applicationbackend.data.formulaone.FormulaTeamData;
import bredex.f1applicationbackend.entities.FormulaTeam;
import bredex.f1applicationbackend.mappers.FormulaTeamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FormulaOneService {

    @Autowired
    UserDao userDao;

    @Autowired
    FormulaTeamDao formulaTeamDao;

    @Autowired
    FormulaTeamMapper formulaTeamMapper;

    public Page<FormulaTeamData> getFormulaTeams(Pageable pageRequest){
        Page<FormulaTeam> pagedResult = formulaTeamDao.findAll(pageRequest);
        Page<FormulaTeamData> mapperResult = pagedResult.map(formulaTeamMapper::mapEntity);
        return mapperResult;
    }

    public void addFormulaTeam(FormulaTeamData formulaTeamData) throws GeneralException {
        if(formulaTeamDao.existsByName(formulaTeamData.name))
            throw new GeneralException("This Formula One Team name is already taken: "+ formulaTeamData.name);

        formulaTeamData.id = null;
        FormulaTeam newFormulaTeam = formulaTeamMapper.mapDTO(formulaTeamData);
        formulaTeamDao.save(newFormulaTeam);
    }

    public void updateFormulaTeam(Long id, FormulaTeamData formulaTeamData) throws GeneralException {
        FormulaTeam formulaTeam = formulaTeamDao.findById(id)
                .orElseThrow(()->new GeneralException("Formula One team not found by id: "+ id));

        formulaTeam.setName(formulaTeamData.name);
        formulaTeam.setFoundationDate(formulaTeamData.foundationDate);
        formulaTeam.setNumberOfConstructorWins(formulaTeamData.numberOfConstructorWins);
        formulaTeam.setIsPaymentDue(formulaTeamData.isPaymentDue);
        formulaTeamDao.save(formulaTeam);
    }

    public void deleteFormulaTeam(Long id) throws GeneralException {
        FormulaTeam formulaTeam = formulaTeamDao.findById(id)
                .orElseThrow(()->new GeneralException("Formula One team not found by id: "+ id));
        formulaTeamDao.delete(formulaTeam);
    }
}
