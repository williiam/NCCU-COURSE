import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    // marginBottom: '1rem',
    display: 'flex',
    // padding: '10px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    // flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      //flexDirection: 'column-reverse',
    },
  },
  breadcrumb: {
    marginBottom:'5px'
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    // width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    // marginLeft: '0 10px',
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  form:{
    marginTop:'10px',
    marginBottom:'30px',
    paddingTop:'20px',
    paddingBottom:'30px',
  },
  divider:{
    marginTop:'10px',
    marginBottom:'20px'
  },
  btn:{
    
  },
  buttonSubmit: {
    marginTop:'10px',
    marginBottom: 10,
  },
}));
