import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Fetch species list
const getSpecies = async () => {
    try {
        const response = await axios.get(`${API_URL}/species`);
        return response.data;
    } catch (error) {
        console.error('Error fetching species:', error);
        throw error;
    }
};

// Add intake record
const addIntake = async (intakeResponseObj) => {
    try {
        const response = await axios.post(`${API_URL}/intake-response`, intakeResponseObj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding intake:', error);
        throw error;
    }
};

export default {
    getSpecies,
    addIntake,
};
