import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      // flexDirection: 'column-reverse',
      paddingLeft: '3px',
      paddingRight: '3px',
      
    },
  },
  mainContainer:{
    maxWidth:'1500px'
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    // minHeight: "100%",
    overflowY: "hidden",
    /* Equal to height of footer */
    /* But also accounting for potential margin-bottom of last child */
    marginBottom: "-50px"
  }
}));
