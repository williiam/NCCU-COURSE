import { START_LOADING_COURSES, END_LOADING_COURSES, FETCH_ALL_COURSES, FETCH_COURSES_BY_SEARCH, FETCH_COURSES_BY_DEPARTMENT, FETCH_COURSE, LIKE_COURSE, COMMENT_COURSE, CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE } from '../../constants/actionTypes';
import * as api from '../../utils/api/index.js';

export const getCourse = (semester,code) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });

    const { data } = await api.fetchCourse({semester: semester, code: code});
    dispatch({ type: FETCH_COURSE, payload: { course: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchCourses(page);

    dispatch({ type: FETCH_ALL_COURSES, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data } } = await api.fetchCoursesBySearch(search);
    dispatch({ type: FETCH_COURSES_BY_DEPARTMENT, payload: { data } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesByDepartment = (department) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data } } = await api.fetchCoursesByDepartment(department);
    dispatch({ type: FETCH_COURSES_BY_DEPARTMENT, payload: { data } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesByInstructor = (instructor) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data } } = await api.fetchCoursesByInstructor(instructor);
    dispatch({ type: FETCH_COURSES_BY_DEPARTMENT, payload: { data } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesByType = (department) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data } } = await api.fetchCoursesByType(department);
    dispatch({ type: FETCH_COURSES_BY_DEPARTMENT, payload: { data } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursesByUserLike = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COURSES });
    const { data: { data } } = await api.fetchCoursesByUserLike(userdata);
    dispatch({ type: FETCH_COURSES_BY_DEPARTMENT, payload: { data } });
    dispatch({ type: END_LOADING_COURSES });
  } catch (error) {
    console.log(error);
  }
};

// export const getCoursesBySearch = (searchQuery) => async (dispatch) => {
//   try {
//     dispatch({ type: START_LOADING_COURSES });
//     const { data: { data } } = await api.fetchCoursesBySearch(searchQuery);

//     dispatch({ type: FETCH_COURSES_BY_SEARCH, payload: { data } });
//     dispatch({ type: END_LOADING_COURSES });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateBook = (id, Book) => async (dispatch) => {
//   try {
//     const { data } = await api.updateBook(id, Book);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const likeBook = (id) => async (dispatch) => {
//   const user = JSON.parse(localStorage.getItem('profile'));

//   try {
//     const { data } = await api.likeBook(id, user?.token);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const commentBook = (value, id) => async (dispatch) => {
//   try {
//     const { data } = await api.comment(value, id);

//     dispatch({ type: COMMENT, payload: data });

//     return data.comments;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteBook = (id) => async (dispatch) => {
//   try {
//     await await api.deleteBook(id);

//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };
