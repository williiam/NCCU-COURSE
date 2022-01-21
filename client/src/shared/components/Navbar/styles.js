import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '15px 0px 15px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 10px',
    maxWidth: '100%',
    maxHeight: '50px',
    minWidth: '50px',
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    // },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  brandContainer: {
   
    margin: '5px 8px 5px 0px ',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      margin: '5px 2px 5px 0px ',
    },
  },
  image: {
    // minWidth:'200px',
    marginLeft: '5px',
    marginRight: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    width: '100%',
    // height: 'auto',
    // naxHeight: '30px',
    // [theme.breakpoints.up('xs')]: {
    //   width: '100%',
    // },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    // marginLeft: '10px',
    width: '100%',
    height: 'auto',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    // },
  },
  buttonText: {
    lineHeight: '10px',
    fontSize: '25px'
  },
  userbar: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginLeft: '0px',
    // width: '300px',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    // },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    // width: '300px',
    alignItems: 'center',
    // [theme.breakpoints.down('sm')]: {
    //   width: 'auto',
    //   marginTop: 20,
    //   justifyContent: 'center',
    // },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  dahaze:{    
    minWidth:'55px',
    [theme.breakpoints.up('xs')]: {
      width:"64px"
    },
  }
}));
