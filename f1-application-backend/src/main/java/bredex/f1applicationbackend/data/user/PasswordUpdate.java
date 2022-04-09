package bredex.f1applicationbackend.data.user;

import lombok.Data;

@Data
public class PasswordUpdate {
    public String oldPassword;
    public String newPassword;
    public String newPasswordAgain;
}
