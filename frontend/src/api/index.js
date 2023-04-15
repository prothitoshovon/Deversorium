import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
});
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
export const createRoom = (newRoom) => API.post('/rooms',newRoom )


export const getUserByEmail = (email) => API.post(`/user/${email}`,email)


export const createHostel = (newHostel) => API.post('/hostels', newHostel)
export const getHostelByOwnerId = (id) => API.get(`/hostels/o/${id}`)

