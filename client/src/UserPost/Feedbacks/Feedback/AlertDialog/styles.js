import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '70%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  introduction: {
    // display: 'flex',
    // justifyContent: 'space-between',
    margin: '0 20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
      // duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red',
  },
  title: {
    display: 'inline-block',
  },
  star: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: '0px',
    right:'0px'
  },
  root: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
    },
  },
  paper: {
    // padding: theme.spacing(2),
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stars: {
    fontFamily: 'Helvetica',
    margin: '10px auto'
  },
  sliderWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '97%',
  },
  sliderContent: {
    width: '97%',
    maxWidth: '700px',
    margin: '5px 0',
    marginLeft:'0px',
  },
  fileInput: {
    width: '98%',
    margin: '10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  snackbar:{
    // width:'60%',
    minWidth: '300px'
  },
  snackbarbtn:{
    // width:'60%',
    color:'white',
    marginLeft:'85px'
  },
  btntext:{
    color:'white'
  },
  InputContent: {
    width: '98%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2px 0',
    // padding: 0,
    // justifyContent: 'center',
  },
  selectContent: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2px 0',
    // padding: 0,
    // justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 0,
  },
  
});
