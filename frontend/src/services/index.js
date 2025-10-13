import fetchData from "./api";
import { API_URL } from "../config";
class AuthService {
    async login({ username, password }) {
        return await fetchData(`${API_URL}/api/auth/jwt/create/`, 'POST', false, {
            username,
            password
        });
    }
    async me() {
        return await fetchData(`${API_URL}/api/auth/users/me/`, 'GET', true, {
        });
    }
    async register({ username, email, password }) {
        return await fetchData(`${API_URL}/api/auth/users/`, 'POST', false, {
            username,
            email,
            password
        });
    }
}

export default new AuthService();