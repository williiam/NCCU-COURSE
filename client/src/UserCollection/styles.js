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
    [theme.breakpoints.down('xs')]: {
      //flexDirection: 'column-reverse',
    },
  },
  breadcrumb: {
    marginBottom:'5px'
  },
  options:{
    display: 'inline-block',
  },
  orderMode: {
    marginLeft: 'auto',
    marginRight: '0px'
  },
  star: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: '0px',
    // right: '0px',
    // float: 'right',
  },
  optionsContainer:{
    marginBottom: '10px'
  },
  searchButton:{
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));
