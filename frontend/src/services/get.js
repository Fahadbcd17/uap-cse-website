import fetchData from "./api";
import { API_URL } from "../config";

class GetService {
    // User Profile methods
    async getCurrentUserProfile() {
        return await fetchData(`${API_URL}/api/user-profiles/me/`, 'GET', true);
    }

    async updateCurrentUserProfile(userData) {
        const isMultipart = userData instanceof FormData;
        return await fetchData(
            `${API_URL}/api/user-profiles/me/`, 
            'PUT', 
            true, 
            userData,
            isMultipart
        );
    }

    // Posts methods
    async getPosts() {
        return await fetchData(`${API_URL}/api/post/`, 'GET', true);
    }
    
    async getPost(id) {
        return await fetchData(`${API_URL}/api/post/${id}/`, 'GET', true);
    }
    
    async createPost(postData) {
        const isMultipart = postData instanceof FormData;
        return await fetchData(`${API_URL}/api/post/`, 'POST', true, postData, isMultipart);
    }
    
    async updatePost(id, postData) {
        const isMultipart = postData instanceof FormData;
        return await fetchData(`${API_URL}/api/post/${id}/`, 'PUT', true, postData, isMultipart);
    }
    
    async deletePost(id) {
        return await fetchData(`${API_URL}/api/post/${id}/`, 'DELETE', true);
    }
    
    // Clubs methods
    async getClubs() {
        return await fetchData(`${API_URL}/api/club/`, 'GET', true);
    }
    
    async getClub(id) {
        return await fetchData(`${API_URL}/api/club/${id}/`, 'GET', true);
    }

    // Presidents methods
    async getPresidents() {
        return await fetchData(`${API_URL}/api/presidents/`, 'GET', true);
    }
    
    async getPresident(id) {
        return await fetchData(`${API_URL}/api/presidents/${id}/`, 'GET', true);
    }    

    async getConveners() {
        return await fetchData(`${API_URL}/api/conveners/`, 'GET', true);
    }
    
    async getConvener(id) {
        return await fetchData(`${API_URL}/api/conveners/${id}/`, 'GET', true);
    }

    // Vice Presidents methods
    async getVicePresidents() {
        return await fetchData(`${API_URL}/api/vice-presidents/`, 'GET', true);
    }
    
    async getVicePresident(id) {
        return await fetchData(`${API_URL}/api/vice-presidents/${id}/`, 'GET', true);
    }

    // General Secretaries methods
    async getGeneralSecretaries() {
        return await fetchData(`${API_URL}/api/general-secretaries/`, 'GET', true);
    }
    
    async getGeneralSecretary(id) {
        return await fetchData(`${API_URL}/api/general-secretaries/${id}/`, 'GET', true);
    }

    // Treasurers methods
    async getTreasurers() {
        return await fetchData(`${API_URL}/api/treasurers/`, 'GET', true);
    }
    
    async getTreasurer(id) {
        return await fetchData(`${API_URL}/api/treasurers/${id}/`, 'GET', true);
    }

    // Executives methods
    async getExecutives() {
        return await fetchData(`${API_URL}/api/executives/`, 'GET', true);
    }
    
    async getExecutive(id) {
        return await fetchData(`${API_URL}/api/executives/${id}/`, 'GET', true);
    }

    // Events methods
    async getEvents() {
        return await fetchData(`${API_URL}/api/events/`, 'GET', true);
    }
    
    async getEvent(id) {
        return await fetchData(`${API_URL}/api/events/${id}/`, 'GET', true);
    }

    // Club-specific data methods
    async getClubExecutives(clubId) {
        return await fetchData(`${API_URL}/api/executives/?club=${clubId}`, 'GET', true);
    }
    
    async getClubEvents(clubId) {
        return await fetchData(`${API_URL}/api/events/?club=${clubId}`, 'GET', true);
    }
}

export default new GetService();