import React,{useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from '@material-ui/data-grid';
import moment from "moment";

import Course from './Course/Course';
import useStyles from './styles';

const Courses = ({ filter,expanded}) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const { courses, isLoadingCourse } = useSelector((state) => state.course);
  const classes = useStyles();
  let filteredCourses =  courseFilter(courses,filter);
  
  useEffect(() => {    
    filteredCourses = courseFilter(courses,filter);
    return () => {

    }
  }, [expanded])

  //if (!books.length && !isLoading) return 'No books';

  const userLikes=user?.dbdata?.likes?user.dbdata.likes:[];

  return (
    isLoadingCourse ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={2}>
        {filteredCourses?.map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={6} lg={4}>
            <Course course={course} _expanded={expanded} _liked={userLikes.includes(course.course)?true:false} />
          </Grid>
        ))}
      </Grid>
    )
  );
};


//input: 一個卡片陣列
//output: 過濾過的卡片陣列
const courseFilter = (collections,filters) => {
  const {  searchTerm, searchTerm2, orderMode, subType } = filters;
  const { mon ,tue ,wed ,thi ,fri ,morning ,noon ,afternoon ,night  } = filters;

  if (searchTerm) {
    collections = collections.filter(collection => collection.courseNameZH_TW.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (searchTerm2) {
    collections = collections.filter(collection => collection.instructorZH_TW.toLowerCase().includes(searchTerm2.toLowerCase()));
  }
  
  if(subType!==''){
    collections = collections.filter(collection => collection.courseNameZH_TW.toLowerCase().includes(subType.toLowerCase()));
  }

  let session_date_string="";
  let session_date_mode=false;

  if(mon===true){
    session_date_string+="一";
    session_date_mode=true;
  }
  if(tue===true){
    session_date_string+="二";
    session_date_mode=true;
  }
  if(wed===true){
    session_date_string+="三";
    session_date_mode=true;
  }
  if(thi===true){
    session_date_string+="四";
    session_date_mode=true;
  }
  if(fri===true){
    session_date_string+="五";
    session_date_mode=true;
  }

  if(session_date_mode){
    collections = collections.filter(course => (match(course.sessionZH_TW,session_date_string)!==0));
  }

  let session_time_string="";
  let session_time_mode=false;

  if(morning===true){
    session_time_string+="1234";
    session_time_mode=true;
  }
  if(noon===true){
    session_time_string+="CD56";
    session_time_mode=true;
  }
  if(afternoon===true){
    session_time_string+="D5678E";
    session_time_mode=true;
  }
  if(night===true){
    session_time_string+="78EFG";
    session_time_mode=true;
  }

  if(session_time_mode){
    collections = collections.filter(course => (match(course.sessionZH_TW,session_time_string)!==0));
  }

  if (orderMode!="") {
    
    if(orderMode=="DEFAULT"){
      // collections = collections.filter(card => moment(card.updatedAt).isAfter(moment().subtract(3, 'days')));
    }
    else if(orderMode=="RATE"){
      collections = collections.sort((course1,course2) => {return(course2.avg_rate-course1.avg_rate)});
    }
    else if(orderMode=="SWEET"){
      collections = collections.sort((course1,course2) => {return(course2.avg_sweet-course1.avg_sweet)});
    }
    else if(orderMode=="LOADING"){
      collections = collections.sort((course1,course2) => {return(course2.avg_loading-course1.avg_loading)});    
    }
    else if(orderMode=="NUM_OF_FEEDBACK"){
      collections = collections.sort((course1,course2) => {return(course2.num_of_feedback-course1.num_of_feedback)});
    }
    else if(orderMode=="NUM_OF_LIKE"){
      collections = collections.sort((course1,course2) => {return(course2.num_of_like-course1.num_of_like)});
    }
    else if(orderMode=="LATEST"){
      
      collections = collections.sort((a,b)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    
  }

  return collections;
}

function match(s1,s2){
  var s1Array = s1.split("");
  var s2Array = s2.split("");
  var count = 0;
  let index = 0;
  
  s1Array.filter(s1 => {
      index = s2Array.findIndex(s2 => s2 == s1);
      if(index >= 0){
          count++;
          s2Array.splice(index, 1);
      }
  });
  return count;
}

export default Courses;

