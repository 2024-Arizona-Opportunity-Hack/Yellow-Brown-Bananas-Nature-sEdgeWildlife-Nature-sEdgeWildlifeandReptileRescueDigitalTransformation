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
const addIntakeResponse = async (intakeResponseObj) => {
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

const getIntakeResponse = async () => {
    try {
        const response = await axios.get(`${API_URL}/intake-response`);
        return response.data;
    } catch (error) {
        console.error('Error fetching intake responses:', error);
        throw error;
    }
};

const addAdoptionResponse = async (adoptionResponseObj) => {
    try {
        const response = await axios.post(`${API_URL}/adoption-response`, adoptionResponseObj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding adoption:', error);
        throw error;
    }
}

export default {
    getSpecies,
    addIntakeResponse,
    getIntakeResponse,
    addAdoptionResponse
};
