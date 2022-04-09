package bredex.f1applicationbackend.services;


import bredex.f1applicationbackend.config.exception.exceptions.GeneralException;
import bredex.f1applicationbackend.config.security.AppUserDetails;
import bredex.f1applicationbackend.dao.UserDao;
import bredex.f1applicationbackend.data.user.PasswordUpdate;
import bredex.f1applicationbackend.data.user.Registration;
import bredex.f1applicationbackend.data.user.UserData;
import bredex.f1applicationbackend.entities.AppUser;
import bredex.f1applicationbackend.entities.roles.Role;
import bredex.f1applicationbackend.mappers.UserMapper;
import org.mapstruct.Named;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Optional;


@Service
public class AppUserService  implements UserDetailsService {
    private static Logger log = LoggerFactory.getLogger(AppUserService.class);



    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userDao.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        userDao.save(user);

        return new AppUserDetails(user);
    }

    public UserData saveForumUser(Registration userRegistration) throws IOException, GeneralException {
        if(userDao.existsByUsername(userRegistration.getUsername())) {
            throw new GeneralException("Username already exists: " + userRegistration.getUsername());
        }

        if(userRegistration.password.compareTo(userRegistration.passwordAgain)!=0){
            throw new GeneralException("Password and Password Again does not match!");
        }

        AppUser newUser = new AppUser();
        newUser.setUsername(userRegistration.getUsername());
        newUser.setPassword(encoder.encode(userRegistration.getPassword()));
        newUser.setEmail(userRegistration.email);
        newUser.setEnabled(true);
        newUser.setRole(Role.NORMAL);
        newUser = userDao.save(newUser);
        UserData data = userMapper.mapEntity(newUser);

        return data;
    }

    @Named("loadUser")
    public AppUser stringToEventTime(String username) {
        return userDao.findByUsername(username).orElseThrow();
    }


    public UserData getUserData(String username) throws GeneralException{
        AppUser user = userDao.findByUsername(username)
                .orElseThrow(() -> new GeneralException("User not found with username: " + username));

        UserData data = userMapper.mapEntity(userDao.save(user));
        return data;

    }

    public UserData updateUserDetails(UserData dto) throws GeneralException {
        Optional<AppUser> userWithTheNewUsername = userDao.findByUsername(dto.getUsername());

        if(userWithTheNewUsername.isPresent())
            throw new GeneralException("User update failed, username already taken!");

        AppUser currentUser = AppUser.getCurrentUser();
        currentUser.setUsername(dto.username);
        currentUser.setEmail(dto.email);
        userDao.save(currentUser);

        return userMapper.mapEntity(userDao.save(currentUser));
    }

    public void updatePassword(PasswordUpdate dto) throws GeneralException {
        AppUser currentUser = AppUser.getCurrentUser();

        Boolean oldPasswordEquals = encoder.matches(dto.oldPassword,currentUser.getPassword());
        Boolean newPasswordEquals = dto.newPassword.compareTo(dto.newPasswordAgain)==0;

        if(oldPasswordEquals && newPasswordEquals){
            currentUser.setPassword(encoder.encode(dto.getNewPassword()));
            userDao.save(currentUser);
        }
        else{
            throw new GeneralException("User password update failed!");
        }
    }

}
