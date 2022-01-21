import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import { colleges } from "../../shared/constants/nccuData";


import Department from "./Department/Department";
import useStyles from "./styles";

const Departments = ({ college_id, setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // if (!posts.length && !isLoading) return "No posts";

  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={2}
    >
      {colleges[college_id]?.departments?.map((department) => (
        <Grid key={department._id} item xs={6} sm={4} md={3} lg={2}>
          <Department department={department} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
};

export default Departments;
