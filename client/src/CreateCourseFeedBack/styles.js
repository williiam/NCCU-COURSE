
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
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
  notify: {
    width: '97%',
    margin: '5px 0',
    marginLeft:'0px',
    paddingLeft:'0px',
    textAlign: 'start'
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
  lightText:{
    fontWeight: "300",
    lineHeight: "1",
    fontSize: "1.1rem",
    textAlign: 'left'
  }
}));
