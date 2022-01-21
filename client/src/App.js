import React from 'react';
import { Container,Typography,IconButton } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './Home/PostDetails/PostDetails';
import Navbar from './shared/components/Navbar/Navbar';
import Footer from './shared/components/Footer/Footer';
import Home from './Home';
import Departments from './Departments';
import Department from './DepartmentCourse';
import SearchCourse from './SearchCourse';
import InstructorCourses from './InstructorCourse';
import IntegratedCourses from './IntegratedCourse';
import GeneralCourses from './GeneralCourse';
import OtherCourses from './OtherCourse';
import DepartmentBlog from './DepartmentBlog';
import Auth from './Auth';
// import BookDetail from './BookDetail';
import CourseDetail from './CourseDetail';
import ChooseCourse from './ChooseCourse';
import CreateCourseFeedBack from './CreateCourseFeedBack';
import EditCourseFeedBack from './EditCourseFeedBack';
import CreateCourseResource from './CreateCourseResource';
import CreatorOrTag from './shared/components/CreatorOrTag/CreatorOrTag';
import UserSetting from './UserSetting';
import UserPost from './UserPost';
import UserCollection from './UserCollection';
import GoogleForm from './GoogleForm';
import useStyles from "./styles";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  //全改小寫
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Container  className={classes.mainContainer}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/departments" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/departments" exact component={Departments} />
          {/* <Route path="/integrated" exact component={IntegratedCourses} /> */}
          <Route path="/integrated" exact component={IntegratedCourses} />
          <Route path="/general" exact component={GeneralCourses} />
          <Route path="/other" exact component={OtherCourses} />
          <Route path="/department/:departmentId" exact component={Department} />
          <Route path="/instructor/:instructorId" exact component={InstructorCourses} />
          <Route path="/department/blog/:departmentId" exact component={DepartmentBlog} />
          <Route path="/course" exact component={ChooseCourse} />
          <Route path="/search////:semester" exact component={SearchCourse} />
          <Route path="/search/:course_name///:semester" exact component={SearchCourse} />
          <Route path="/search//:instructor_name//:semester" exact component={SearchCourse} />
          <Route path="/search///:department/:semester" exact component={SearchCourse} />
          <Route path="/search/:course_name/:instructor_name//:semester" exact component={SearchCourse} />
          <Route path="/search//:instructor_name/:department/:semester" exact component={SearchCourse} />
          <Route path="/search/:course_name//:department/:semester" exact component={SearchCourse} />
          <Route path="/search/:course_name/:instructor_name/:department/:semester" exact component={SearchCourse} />
          <Route path="/course/:course_id" exact component={CourseDetail} />

          {/* <Route path="/liberals" exact component={Department} /> */}
          {/* <Route path="/liberal/:liberral_id" exact component={Department} /> */}
          <Route path="/chooseCourse" exact component={ChooseCourse} />
          <Route path="/createCourseFeedback/:course" exact component={CreateCourseFeedBack} />
          <Route path="/editCourseFeedback/:course" exact component={EditCourseFeedBack} />
          <Route path="/googleform" exact component={GoogleForm} />
          <Route path="/createCourseResource/:course" exact component={CreateCourseResource} />
          {/* <Route path="/book/:bookId" exact component={BookDetail} /> */}
          <Route path="/user/setting" exact component={UserSetting} />
          <Route path="/user/post" exact component={UserPost} />
          <Route path="/user/collection" exact component={UserCollection} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> */}
          <Route path="/auth" exact component={Auth} />
        </Switch>
        {/* <Footer /> */}
           
      </Container>
        {/* <Footer />     */}
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
