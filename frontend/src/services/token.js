class TokenService {
    getLocalRefreshToken() {
        return JSON.parse(localStorage.getItem("refresh_token"));
    }
    setLocalRefreshToken(refresh_token) {
        localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
    }

    getLocalAccessToken() {
        return JSON.parse(localStorage.getItem("access_token"));
    }

    setLocalAccessToken(access_token) {
        localStorage.setItem("access_token", JSON.stringify(access_token));
    }

    setLocalUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeRefreshToken() {
        localStorage.removeItem("refresh_token");
    }

    removeAccessToken() {
        localStorage.removeItem("access_token");
    }
    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();