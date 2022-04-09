package bredex.f1applicationbackend.mappers;


import bredex.f1applicationbackend.data.user.UserData;
import bredex.f1applicationbackend.entities.AppUser;
import bredex.f1applicationbackend.entities.roles.Role;
import org.mapstruct.*;



@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mappings({})
    UserData mapEntity(AppUser entity);

    default String setAppUser(AppUser entity){
        return entity.getUsername();
    }

    default String setRole(Role role){ return role.name; }
}
