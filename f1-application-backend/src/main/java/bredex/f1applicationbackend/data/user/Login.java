package bredex.f1applicationbackend.data.user;

import lombok.Data;
import javax.validation.constraints.NotEmpty;

@Data
public class Login {
    @NotEmpty
    public String username;

    @NotEmpty
    public String password;

    @Override
    public String toString(){
        return "\nUsername: " + username + "\nPassword: " +password;
    }
}