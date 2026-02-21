import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getProperties = () => axios.get(`${BASE_URL}/Property/getProperties`);
export const addProperty = (data) => axios.post(`${BASE_URL}/Property/addProperty`, data);
export const updateProperty = (id, data) => axios.put(`${BASE_URL}/Property/updateProperty/${id}`, data);
export const deleteProperty = (id) => axios.delete(`${BASE_URL}/Property/deleteProperty/${id}`);
