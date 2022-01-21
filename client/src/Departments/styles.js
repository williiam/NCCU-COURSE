import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  departmentsContent: {
    marginTop:'5px'
  },
  tab:{
    width:'100%',
    maxWidth: '60px'
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider:{
    marginTop: '20px',
    marginBottom: '20px',
  },
  lightText:{
    fontWeight: "400",
    lineHeight: "1.6",
    fontSize: "30px",
    letterSpacing: "0.075em",
    color: "#17204F",
  }
}));
