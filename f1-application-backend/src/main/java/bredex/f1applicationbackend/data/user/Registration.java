package bredex.f1applicationbackend.data.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Registration {
    @NotEmpty
    public String username;

    @NotEmpty
    public String password;

    @NotEmpty
    public String passwordAgain;

    @NotEmpty @Email
    public String email;
}
