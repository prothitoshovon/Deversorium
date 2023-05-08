import axios from 'axios';


const API = axios.create({ baseURL: 'https://deversorium.onrender.com' });
//const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
});
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
export const createRoom = (newRoom) => API.post('/rooms',newRoom )

export const getHostels = () => API.get('/hostels')
export const getUserByEmail = (email) => API.post(`/user/${email}`,email)


export const createHostel = (newHostel) => API.post('/hostels', newHostel)
export const getHostelByOwnerId = (id) => API.get(`/hostels/o/${id}`)

export const getEmptyRooms = () => API.get('/rooms/available/')
export const getRoomsByRoomId = (id) => API.get(`/rooms/${id}`)


export const createRoomRequest = (newRoomRequest) => API.post('/roomRequests', newRoomRequest)

export const createReview = (newReview) => API.post('/reviews',newReview)

export const createComplaint = (newComplaint) => API.post('/complaints',newComplaint)


export const getRoomRequestsByHostelId = (id) => API.get(`/roomRequests/h/${id}`)

export const updateTenant = (id, updatedTenant) => API.patch(`/tenants/${id}`, updatedTenant)

export const getTenantsByUserId = (id) => API.get(`/tenants/${id}`)


export const bookRoom = (id, uid, hid) => API.patch(`/rooms/book/r/${id}/u/${uid}/h/${hid}`)

//router.delete('/:id', auth, deleteRoomRequest);
export const deleteRoomRequest = (id) => API.delete(`/roomRequests/${id}`)

export const getHostelByHostelId = (id) => API.get(`/hostels/h/${id}`)

// router.get('/userhostel/:uid/:hid',getReviewsByUserAndHostel);

export const getReviewsByUserAndHostel = (uid, hid) => API.get(`reviews/userhostel/${uid}/${hid}`)
export const getReviewsByHostel = (id) => API.get(`/reviews/h/${id}`)

// router.patch('/update/:uid',updateuser)
export const updateuser = (uid, newUser) => API.patch(`/user/update/${uid}`,newUser)
// router.patch('/:id',auth,updateReview);
export const updateReview = (id, newReview) => API.patch(`/reviews/${id}`,newReview)

export const getComplaintsByHostel = (id) => API.get(`/complaints/h/${id}`)

// router.patch('/leave/r/:id/u/:uid/h/:hid',auth,leaveRoom);
export const leaveRoom = (id,uid,hid) => API.patch(`/rooms/leave/r/${id}/u/${uid}/h/${hid}`)


// router.get('/h/:id',getTenantsByHostelId);
export const getTenantsByHostelId = (id) => API.get(`/tenants/h/${id}`)

// router.get('/:id',getuserbyuserid);
export const getuserbyuserid = (id) => API.get(`/user/${id}`)

// router.get('/h/:id',getRoomsByHostelId)
export const getRoomsByHostelId = (id) => API.get(`/rooms/h/${id}`)

// router.delete('/:id',auth,deleteComplaint);
export const deleteComplaint = (id) => API.delete(`/complaints/${id}`)

// router.patch('/bills/create/:id',generateBill);
export const generateBill = (id) => API.patch(`/hostels/bills/create/${id}`)

// router.patch('/bills/receive/:uid',receiveBill);
export const receiveBill = (uid) => API.patch(`/hostels/bills/receive/${uid}`)

// router.get('/h/:id',getMealItemsByHostel);

export const getMealItemsByHostel = (id) => API.get(`/mealItems/h/${id}`)
// router.post('/',auth,createMealItem);

export const createMealItem = (newMealItem) => API.post('/mealItems',newMealItem)

// router.patch('/:id', auth, updateHostel);
export const updateHostel = (id,newHostel) => API.patch(`/hostels/${id}`,newHostel)

// router.delete('/:id',auth,deleteMealItem);
export const deleteMealItem = (id) => API.delete(`/mealItems/${id}`)

// router.get('/u/:id',getRoomRequestsByUserId);
export const getRoomRequestsByUserId = (id) => API.get(`/roomRequests/u/${id}`)