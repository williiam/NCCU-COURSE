import { START_LOADING_COURSES, END_LOADING_COURSES, FETCH_ALL_COURSES, FETCH_COURSES_BY_SEARCH, FETCH_COURSES_BY_DEPARTMENT, FETCH_COURSE, LIKE_COURSE, COMMENT_COURSE, CREATE_COURSE, UPDATE_COURSE, DELETE_COURSE } from '../../constants/actionTypes';

const courseReducer = (state = { isLoadingCourse: true, courses: [] }, action) => {
  switch (action.type) {
    case START_LOADING_COURSES:
      return { ...state, isLoadingCourse: true };
    case END_LOADING_COURSES:
      return { ...state, isLoadingCourse: false };
    case FETCH_ALL_COURSES:
      return {
        ...state,
        courses: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_COURSES_BY_SEARCH:
    case FETCH_COURSES_BY_DEPARTMENT:
      return { ...state, courses: action.payload.data };
    case FETCH_COURSE:
      return { ...state, course: action.payload.book };
    case LIKE_COURSE:
      return { ...state, courses: state.courses.map((course) => (course._id === action.payload._id ? action.payload : course)) };
    case COMMENT_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course._id == +action.payload._id) {
            return action.payload;
          }
          return course;
        }),
      };
    case CREATE_COURSE:
      return { ...state, courses: [...state.courses, action.payload] };
    case UPDATE_COURSE:
      return { ...state, courses: state.courses.map((course) => (course._id === action.payload._id ? action.payload : course)) };
    case DELETE_COURSE:
      return { ...state, courses: state.courses.filter((course) => course._id !== action.payload) };
    default:
      return state;
  }
};

export default courseReducer;