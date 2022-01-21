import axios from 'axios';

const API = axios.create({ baseURL: ' http://localhost:80', headers: {
  "Content-type": "application/json"
} },);

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const fetchBook = (id) => API.get(`/books/${id}`);
// export const fetchBooks = (page) => API.get(`/books?page=${page}`);
// export const fetchBooksBySearch = (department) => API.get(`/books/department?department=${department}`);
// export const fetchBooksByDepartment = (department) => API.get(`/books/department?department=${department}`);
// export const createBook = (newBook) => API.post('/books', newBook);

export const fetchCourse = (course) => API.post(`/course`,course);
export const fetchCourseWithCheck = (course) => API.post(`/course/check`,course);
export const fetchCourseDetail = (course) => API.post(`/course/detail`,course);
export const fetchCourseResource = (course) => API.post(`/resource/get`,course);
export const fetchCourses = (page) => API.get(`/courses?page=${page}`);
export const fetchCoursesBySearch = (search) => API.post(`/course/search`,search);
export const fetchCoursesByDepartment = (department) => API.post(`/course/department`, department );
export const fetchCoursesByInstructor = (instructor) => API.post(`/course/instructor`, instructor );
export const fetchCoursesByType = (data) => API.post(`/course/type`, data);
export const fetchCoursesByUserLike = (data) => API.post(`/course/userlike`, data);
export const createCourse = (newBook) => API.post('/books', newBook);

export const fetchFeedBack = (feedBack) => API.post('/feedback/get', feedBack);
export const createFeedBack = (newFeedBack) => API.post('/feedback', newFeedBack);
export const updateFeedBack = (feedBack) => API.post('/feedback/update', feedBack);
export const checkUserFeedback = (feedBack) => API.post('/feedback/check', feedBack);
export const deleteFeedBack = (feedBack) => API.post('/feedback/delete', feedBack);
export const createResource = (newResource) => API.post('/resource', newResource);
export const createCourseComment = (value, id) => API.post(`/course/${id}/commentPost`, { value });

export const updateLike = (userData) => API.post('/user/like', userData);
export const updateNickname = (userData) => API.post('/user/nickname', userData);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const googleSignIn = (formData) => API.post('/user/googlesignin', formData);