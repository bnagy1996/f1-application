package bredex.f1applicationbackend.config.security;

import bredex.f1applicationbackend.entities.AppUser;
import org.springframework.security.core.context.SecurityContextHolder;

public class ForumSecurityContextHolder {

    public static AppUser getUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof AppUserDetails){
            AppUserDetails userDetails = (AppUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return userDetails.getUser();
        }

        return AppUser.getAnonymous();
    }
}
