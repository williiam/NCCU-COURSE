import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  a: {
    lineHeight: "10px",
    paddingTop: "1px",
  },
  iframe: {
    height: "500px",
  },
  sliderWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "97%",
  },
  sliderContent: {
    width: "97%",
    maxWidth: "700px",
    margin: "5px 0",
    marginLeft: "0px",
  },
  fileInput: {
    width: "98%",
    margin: "10px 0",
    display: "flex",
    flexWrap: "wrap",
    // justifyContent: 'center',
  },
  InputContent: {
    width: "98%",
    display: "flex",
    flexWrap: "wrap",
    margin: "2px 0",
    // padding: 0,
    // justifyContent: 'center',
  },
  selectContent: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    margin: "2px 0",
    // padding: 0,
    // justifyContent: 'center',
  },
  buttonSubmit: {
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    marginLeft: 0,
  },
  input:{
    verticalAlign:'bottom'
  }
}));
