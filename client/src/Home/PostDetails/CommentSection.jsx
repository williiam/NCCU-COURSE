import React, { useState, useRef } from 'react';
import { Typography, TextField, Button,Grid } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../shared/redux/actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.dbdata?.nickname}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
    <div className={classes.commentsOuterContainer}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={1}
          // className={classes.gridContainer}
        >
          <Grid item xs={12} sm={12} md={12}>

        <Typography gutterBottom variant="h6">
          留言板
        </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1" style={{ textAlign: "left",whiteSpace: "pre-line" }}>
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
            </div>
            <div ref={commentsRef} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {/* <div style={{ width: "70%" }}> */}
            <div >
              {/* <Typography gutterBottom variant="h6">留言</Typography> */}
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="輸入留言"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <br />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment.length}
                color="primary"
                variant="contained"
                onClick={handleComment}
              >
                留言
              </Button>
            </div>
          </Grid>
        </Grid>
    </div>
  </div>
  );
};

export default CommentSection;
