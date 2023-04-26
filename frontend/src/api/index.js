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

export const getEmptyRooms = () => API.get('/rooms/available/')
export const getRoomsByRoomId = (id) => API.get(`/rooms/${id}`)


export const createRoomRequest = (newRoomRequest) => API.post('/roomRequests', newRoomRequest)

export const createReview = (newReview) => API.post('/reviews',newReview)


export const getRoomRequestsByHostelId = (id) => API.get(`/roomRequests/h/${id}`)

export const updateTenant = (id, updatedTenant) => API.patch(`/tenants/${id}`, updatedTenant)

export const getTenantsByUserId = (id) => API.get(`/tenants/${id}`)


export const bookRoom = (id, uid, hid) => API.patch(`/rooms/book/r/${id}/u/${uid}/h/${hid}`)

//router.delete('/:id', auth, deleteRoomRequest);
export const deleteRoomRequest = (id) => API.delete(`/roomRequests/${id}`)

export const getHostelByHostelId = (id) => API.get(`/hostels/h/${id}`)

