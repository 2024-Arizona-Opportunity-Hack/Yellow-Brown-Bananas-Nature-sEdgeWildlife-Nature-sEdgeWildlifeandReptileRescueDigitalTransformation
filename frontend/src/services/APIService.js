import axios from 'axios';

const API_URL = 'http://localhost:8000';

const getSpecies = async () => {
    try {
        const response = await axios.get(`${API_URL}/species`);
        return response.data;
    } catch (error) {
        console.error('Error fetching species:', error);
        throw error;
    }
};

export default {
    getSpecies,
};
