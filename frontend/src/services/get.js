import fetchData from "./api";
import { API_URL } from "../config";

class GetService {
    // User Profile methods
    async getCurrentUserProfile(authRequired = true) {
        return await fetchData(`${API_URL}/api/user-profiles/me/`, 'GET', authRequired);
    }

    async updateCurrentUserProfile(userData, authRequired = true) {
        return await fetchData(`${API_URL}/api/user-profiles/me/`, 'PUT', authRequired, userData);
    }

    // Posts methods
    async getPosts(authRequired = true) {
        return await fetchData(`${API_URL}/api/post/`, 'GET', authRequired);
    }
    
    async getPost(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/post/${id}/`, 'GET', authRequired);
    }
    
    async createPost(postData, authRequired = true) {
        return await fetchData(`${API_URL}/api/post/`, 'POST', authRequired, postData);
    }
    
    async updatePost(id, postData, authRequired = true) {
        return await fetchData(`${API_URL}/api/post/${id}/`, 'PUT', authRequired, postData);
    }
    
    async deletePost(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/post/${id}/`, 'DELETE', authRequired);
    }
    
    // Clubs methods
    async getClubs(authRequired = true) {
        return await fetchData(`${API_URL}/api/club/`, 'GET', authRequired);
    }
    
    async getClub(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/club/${id}/`, 'GET', authRequired);
    }

    // Presidents methods
    async getPresidents(authRequired = true) {
        return await fetchData(`${API_URL}/api/presidents/`, 'GET', authRequired);
    }
    
    async getPresident(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/presidents/${id}/`, 'GET', authRequired);
    }    

    async getConveners(authRequired = true) {
        return await fetchData(`${API_URL}/api/conveners/`, 'GET', authRequired);
    }
    
    async getConvener(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/conveners/${id}/`, 'GET', authRequired);
    }

    // Vice Presidents methods
    async getVicePresidents(authRequired = true) {
        return await fetchData(`${API_URL}/api/vice-presidents/`, 'GET', authRequired);
    }
    
    async getVicePresident(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/vice-presidents/${id}/`, 'GET', authRequired);
    }

    // General Secretaries methods
    async getGeneralSecretaries(authRequired = true) {
        return await fetchData(`${API_URL}/api/general-secretaries/`, 'GET', authRequired);
    }
    
    async getGeneralSecretary(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/general-secretaries/${id}/`, 'GET', authRequired);
    }

    // Treasurers methods
    async getTreasurers(authRequired = true) {
        return await fetchData(`${API_URL}/api/treasurers/`, 'GET', authRequired);
    }
    
    async getTreasurer(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/treasurers/${id}/`, 'GET', authRequired);
    }

    // Executives methods
    async getExecutives(authRequired = true) {
        return await fetchData(`${API_URL}/api/executives/`, 'GET', authRequired);
    }
    
    async getExecutive(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/executives/${id}/`, 'GET', authRequired);
    }

    // Events methods
    async getEvents(authRequired = true) {
        return await fetchData(`${API_URL}/api/events/`, 'GET', authRequired);
    }
    
    async getEvent(id, authRequired = true) {
        return await fetchData(`${API_URL}/api/events/${id}/`, 'GET', authRequired);
    }

    // Club-specific data methods
    async getClubExecutives(clubId, authRequired = true) {
        return await fetchData(`${API_URL}/api/executives/?club=${clubId}`, 'GET', authRequired);
    }
    
    async getClubEvents(clubId, authRequired = true) {
        return await fetchData(`${API_URL}/api/events/?club=${clubId}`, 'GET', authRequired);
    }
}

export default new GetService();