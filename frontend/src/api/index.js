import axios from 'axios';

const url = 'http://localhost:5000/hostels';

export const fetchHostels = () => axios.get(url);
export const createHostels = (newHostel) => axios.post(url, newHostel);
export const updateHostel = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deleteHostel = (id) => axios.delete(`${url}/${id}`);