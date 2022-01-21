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
    // marginTop: '-8px',
    // marginBottom: '-8px',
    // flexDirection: 'column',
    padding: '0px 0px',
    [theme.breakpoints.down('xs')]: {
      //flexDirection: 'column-reverse',
    },
  },
  divider:{
    margin:'15px 0px',

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
  starContainer: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  star:{
    position: 'relative',
    top:0,
    right:0,
    float: 'right',
    marginRight:0,
    // [theme.breakpoints.down('sm')]: {
    //   float: 'left',
    //   paddingLeft:0,
    //   marginLeft: 0,
    // },
  },
  lightText:{
    fontWeight: "300",
    lineHeight: "1.4",
    fontSize: "1.1rem",
    textAlign: 'left'
  },
  titleText:{
    fontWeight: "300",
    lineHeight: "1.4",
    fontSize: "1.1rem",
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      marginTop: "15px",
    },
  },
  mediumText:{
    fontWeight: "350",
    lineHeight: "1.6",
    fontSize: "1.2rem",
    textAlign: 'left'
  },
  heavyText:{
    fontWeight: "350",
    lineHeight: "1.6",
    fontSize: "1.4rem",
    textAlign: 'left'
  },
  headerText:{
    fontWeight: "350",
    lineHeight: "1.6",
    fontSize: "2.2rem",
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      marginTop: "15px",
    },
  },
  number:{
    color: "cornflowerblue"
  },
  feedback:{
    padding: "10px 0px 0px 0px",
    margin:"5px 3px 5px 3px",
    [theme.breakpoints.up('sm')]: {
      padding: "10px 10px 0px 10px",
      margin:"5px 10px 5px 10px"
    },
  },
  btnText: {
    fontSize: "1.1rem",
    fontFamily: "Roboto Helvetica Arial sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.0175em"
}
}));
