import axios from "axios";

// Use environment variable or fallback to localhost
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getProperties = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Property/getProperties`);
        return response.data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const addProperty = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/Property/addProperty`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding property:", error);
        throw error;
    }
};

export const updateProperty = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/Property/updateProperty/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating property with id ${id}:`, error);
        throw error;
    }
};

export const deleteProperty = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/Property/deleteProperty/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting property with id ${id}:`, error);
        throw error;
    }
};