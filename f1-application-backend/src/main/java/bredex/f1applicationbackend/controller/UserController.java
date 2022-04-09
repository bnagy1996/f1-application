package bredex.f1applicationbackend.controller;


import bredex.f1applicationbackend.config.security.AppUserDetails;
import bredex.f1applicationbackend.config.security.JwtTokenUtil;
import bredex.f1applicationbackend.data.user.*;
import bredex.f1applicationbackend.entities.AppUser;
import bredex.f1applicationbackend.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@Validated
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AppUserService userDetailsService;

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(HttpServletResponse response, @RequestBody Login authenticationRequest) throws AuthenticationException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.username, authenticationRequest.password));
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("Authentication failed. Bad Credentials with username: " + authenticationRequest.username);
        }

        final AppUserDetails userDetails = (AppUserDetails) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        final String refresh = "";

        return ResponseEntity.ok(new Token(token, refresh));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveUser(@RequestBody Registration user) throws Exception {
        UserData registeredUser = userDetailsService.saveForumUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping(value = "/logoutUser",  produces="text/plain")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> logout(){
        SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
        return ResponseEntity.ok("Out you logged!");
    }

    @PutMapping(value = "/updateUserdata")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUserData(@Valid @RequestBody UserData update) throws Exception {
        userDetailsService.updateUserDetails(update);
        return ResponseEntity.ok(userDetailsService.getUserData(AppUser.getCurrentUser().getUsername()));
    }

    @PutMapping(value = "/updatePassword")
    @PreAuthorize("isAuthenticated()")
    public void updateUserPassword(@Valid @RequestBody PasswordUpdate update) throws Exception {
        userDetailsService.updatePassword(update);
    }


}
