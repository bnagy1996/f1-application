package bredex.f1applicationbackend.data.user;

import java.io.Serializable;

public class Token  implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final String refreshToken;

    public Token(String jwttoken, String refreshToken) {
        this.jwttoken = jwttoken;
        this.refreshToken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }
    public String getRefreshToken() {return this.refreshToken;}
}
