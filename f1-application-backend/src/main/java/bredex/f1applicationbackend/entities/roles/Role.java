package bredex.f1applicationbackend.entities.roles;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Role {
    NORMAL(1,"Normal",1,true),
    ADMIN(2, "Admin",10, true);

    public Integer id;
    public Integer weight;
    public String name;
    public Boolean enabled;

    Role(Integer _id, String _type, Integer _weight, Boolean _enabled) {
        id = _id;
        weight = _weight;
        name = _type;
        enabled = _enabled;
    }

    public String getName() {
        return name;
    }

    public Integer getId() {
        return id;
    }

    public Integer getWeight() {
        return weight;
    }

    public static Role findByRole(String _role){
        return Stream.of(Role.values())
                .filter(c -> c.getName().compareToIgnoreCase(_role)==0 )
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

    public static List<String> getActiveRolesWithName(){
        return Stream.of(Role.values()).filter(o -> o.enabled==true).map(Role::getName).collect(Collectors.toList());
    }

    public static List<Role> getActiveRoles(){
        return Stream.of(Role.values()).filter(o -> o.enabled==true).collect(Collectors.toList());
    }

    public static List<String> getRoles(){
        return Stream.of(Role.values()).map(Role::getName).collect(Collectors.toList());
    }

}
