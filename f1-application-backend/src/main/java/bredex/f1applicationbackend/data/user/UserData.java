package bredex.f1applicationbackend.data.user;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class UserData {
    public Long id;
    public String username;
    public String email;
    private String role;
}
