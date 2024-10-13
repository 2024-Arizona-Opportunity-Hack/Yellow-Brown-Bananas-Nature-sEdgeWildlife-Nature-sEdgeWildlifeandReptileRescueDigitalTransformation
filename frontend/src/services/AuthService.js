import axios from 'axios';

const backendURL = 'http://localhost:8000';

// Singleton Pattern: The AuthService class is designed as a singleton. 
// The instance variable ensures that only one instance of AuthService is created.
class AuthService {
    constructor() {
        // The constructor checks if an instance already exists. 
        // If it does, it returns the existing instance instead of creating a new one.
        if (!AuthService.instance) {
            AuthService.instance = this;
        }

        return AuthService.instance;
    }

    async authenticate(username, password) {
        // Make the POST request to the backend
        try {
            const response = await axios.post(`${backendURL}/login`, {
                username: username,
                password: password,
            });
            // Check response for successful authentication
            if (response.status === 200) localStorage.setItem('authenticated', true);
        } catch (error) {
            console.error('Authentication failed: ', error.response?.data || error.message);
        }
    }

    async register(username, password) {
        // Make the POST request to the backend
        try {
            const response = await axios.post(`${backendURL}/register`, {
                username: username,
                password: password,
            });

            // Check response for successful registration
            if (response.status === 200) localStorage.setItem('authenticated', true);
            return true;
        } catch (error) {
            console.error('Registration failed: ', error.response?.data || error.message);
        }
        return false;
    }
    
    logout() {
        localStorage.setItem('authenticated', false);
    }
    
    isAuthenticated() {
        // console.log(localStorage.getItem('authenticated'));
        return localStorage.getItem('authenticated');
    }
}

const instance = new AuthService();

export default instance;
