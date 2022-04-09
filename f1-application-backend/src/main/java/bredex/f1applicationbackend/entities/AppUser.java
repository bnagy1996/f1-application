package bredex.f1applicationbackend.entities;


import bredex.f1applicationbackend.config.security.AppUserDetails;
import bredex.f1applicationbackend.entities.roles.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;


@Entity
@Table
@Getter
@Setter
@SequenceGenerator(name="seq", initialValue=100, allocationSize=100)
public class AppUser {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq")
    private Long id;

    @Column(nullable=false)
    private String username;

    @Column(nullable=false)
    private String password;

    @Column(nullable=false)
    private String email;

    @Column(nullable = false)
    private Role role;

    private Boolean enabled;

    public static Boolean isAnonymus(){
        if(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken){
            return true;
        }

        return false;
    }

    public static AppUser getCurrentUser() {
        if(isAnonymus()){
            return getAnonymous();
        }

        AppUserDetails userDetails = (AppUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUser();
    }

    public static AppUser getAnonymous(){
        AppUser anonymus = new AppUser();
        anonymus.setId(-1L);
        anonymus.setUsername("$!-.F/4ŰT}");
        anonymus.setPassword("");
        anonymus.setEmail("");
        anonymus.setEnabled(true);
        anonymus.setRole(Role.NORMAL);
        return anonymus;
    }
}
