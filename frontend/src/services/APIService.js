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

const getIntakeDetail = async (ID) => {  // Add the arrow function syntax
    try {
        const response = await axios.get(`${API_URL}/intake-response/${ID}`);  // Interpolate the ID into the URL
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching intake detail:', error);
        throw error;
    }
};

const updateIntake = async (intakeData) => {
    try {
      const response = await axios.put(`${API_URL}/intake-response/${intakeData.ID}`, intakeData);
      return response.data;
    } catch (error) {
      console.error('Error updating intake data:', error);
      throw error;
    }
};

const animalReadyForAdoption = async (ID) => {
    try {
        const response = await axios.delete(`${API_URL}/rescued-animals/${ID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching intake detail:', error);
        throw error;
    }
}

const getReadyForAdopt = async () => {
    try {
        const response = await axios.get(`${API_URL}/adoptees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching intake detail:', error);
        throw error;
    }
}

const getAdoptResponse = async () => {
    try {
        const response = await axios.get(`${API_URL}/adoption-response`);
        return response.data;
    } catch (error) {
        console.error('Error fetching adoption responses:', error);
        throw error;
    }
};

export default {
    getSpecies,
    addIntakeResponse,
    getIntakeResponse,
    addAdoptionResponse,
    getIntakeDetail,
    updateIntake,
    animalReadyForAdoption,
    getReadyForAdopt,
    getAdoptResponse
};
