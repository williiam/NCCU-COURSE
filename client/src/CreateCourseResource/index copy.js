import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  Slider,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory,useParams } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";

const CreateBook = ({ currentId, setCurrentId }) => {
  const [bookData, setBookData] = useState({
    name: "",
    price:"",
    saleType:"",
    introduction: "",
    description: "",
    appearance: 100,
    noteRatio: 100,
    tags: [],
    selectedFile: "",
    selectedFiles:[],
    type: "department",
    department: "",
    courseType: "",
    grade: "",

  });
  const [selected, setSelected] = useState("else");
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const params = useParams();

  const clear = () => {
    // setCurrentId(0);
    setBookData({
      name: "",
      price: "",
      introduction: "",
      description: "",
      appearance: 100,
      noteRatio: 100,
      tags: [],
      selectedFile: "",
      type: "department",
      department: "",
      courseType: "",
      grade: "",
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setBookData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.result?.name) {
      checkRequiredField();
      dispatch(createBook({ ...bookData,}, history));
      clear();
    }
  };

  const checkRequiredField = () => {
    if(bookData.type==="department"){
      checkValidDepartmentBookData();
    }else if(bookData.type==="liberal"){
      checkValidLiberalBookData();
    }

  };
  const checkValidDepartmentBookData = () => {
    if(bookData.department===""){

    }
    if(bookData.courseType===""){

    }
    if(bookData.grade===""){

    }
  }

  const checkValidLiberalBookData = () => {
    
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          請先登入才能上架您的書
        </Typography>
      </Paper>
    );
  }

  //slider
  const handleAppearenceSlider = (event, value) => {
    setBookData({ ...bookData, appearence: value });
  };

  const handleNoteRatioSlider = (event, value) => {
    setBookData({ ...bookData, noteRatio: value });
  };

  //slider
  function valuetext(value) {
    return `${value}°C`;
  }

  //radio
  const handleRadioChange = (event) => {
    setSelected(event.target.value);
    setBookData({ ...bookData, type: event.target.value });
  };

  //auto complete onchange
  const handleCollegeChange = (event, value) => {
    setBookData({ ...bookData, department: value.value });
  };

  const handleCourseTypeChange = (event, value) => {
    setBookData({ ...bookData, courseType: value.value });
  };

  const handleCourseType2Change = (event, value) => {
    setBookData({ ...bookData, courseType: event.target.value.value });
  };

  const handleSaleTypeChange = (event, value) => {
    setBookData({ ...bookData, saleType: event.target.value });
  };

  const handleGradeChange = (event, value) => {
    setBookData({ ...bookData, grade: value.value });
  };

  //auto complete
  const colleges = [
    { title: "中文系", department: 101 , name: "CHINESE" ,value: 101},
    { title: "歷史系", department: 103, name: "ENGLISH", value: 103},
    { title: "哲學系", department: 104, name: "GERMANY", value: 104},    
  ];

  const courseTypes = [
    { title: "必修", year: 1994, value: "COMPULSORY" },
    { title: "選修", year: 1972, value: "ELECTIVE" },
    { title: "群修", year: 1974, value: "GROUP" },
  ];

  const grades = [
    { title: "大一", id: 1, value: "1"  },
    { title: "大二", id: 2, value: "2"  },
    { title: "大三", id: 3, value: "3"  },
    { title: "大四", id: 4, value: "4"  },
    { title: "不一定", id: 0, value: "0"  },
  ];


  const courseTypes2 = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const saleTypes = [
    {
      value: 'ONSALE',
      label: '賣',
    },
    {
      value: 'FREE',
      label: '免費',
    }
  ];

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        // noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "新增修課攻略"}
        </Typography>
        
        <TextField
          name="name"
          variant="outlined"
          label="標題"
          required
          fullWidth
          value={bookData.name}
          onChange={(event) => setBookData({ ...bookData, name: event.target.value })}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          required
          value={bookData.saleType}
          onChange={handleSaleTypeChange}
          helperText="Please select your currency"
        >
          {saleTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {bookData.saleType==="ONSALE"?        
        <TextField
          name="price"
          variant="outlined"
          label="價錢(台幣)"
          required
          fullWidth
          value={bookData.price}
          onChange={(event) =>{
            setBookData({ ...bookData, price: event.target.value.replace(/\D/,'').replace(/^0+/, '') })
            }
          }
        />:
        <>
        </>
        }
        <div className={classes.sliderWrapper}>
          <div className={classes.sliderContent}>
            <Typography id="appearence-slider" gutterBottom>
              外觀乾淨分數（幾成新）
            </Typography>
            <Slider
              defaultValue={70}
              getAriaValueText={valuetext}
              aria-labelledby="appearence-slider"
              valueLabelDisplay="on"
              step={5}
              marks
              min={30}
              max={100}
              onChange={(event, value) => handleAppearenceSlider(event, value)}
            />
          </div>
          <div className={classes.sliderContent}>
            <Typography id="noteRatio-slider" gutterBottom>
              筆記佔全書比例
            </Typography>
            <Slider
              defaultValue={70}
              getAriaValueText={valuetext}
              aria-labelledby="noteRatio-slider"
              valueLabelDisplay="on"
              step={1}
              marks
              fullWidth
              min={0}
              max={100}
              onChange={(event, value) => handleNoteRatioSlider(event, value)}
            />
          </div>
        </div>
        <TextField
          name="introduction"
          variant="outlined"
          label="書本簡介（非必填）"
          fullWidth
          value={bookData.introduction}
          onChange={(e) =>
            setBookData({ ...bookData, introduction: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="書況描述/ 注意事項/ 推薦"
          required
          fullWidth
          multiline
          rows={4}
          value={bookData.description}
          onChange={(e) =>
            setBookData({ ...bookData, description: e.target.value })
          }
        />
        {/* <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="標籤（教授名,...）"
            fullWidth
            value={bookData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div> */}
        <Typography variant="h6" className={classes.fileInput}>
          {"上傳照片： "}
        </Typography>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, selectedFile: base64 })
            }
          />
        </div>
        <Typography variant="h6" className={classes.fileInput}>
          {"上傳檔案： "}
        </Typography>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, selectedFiles:[...bookData.selectedFiles, base64] })
            }
          />
        </div>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, selectedFiles: base64 })
            }
          />
        </div>
        <div className={classes.InputContent}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setBookData({ ...bookData, selectedFiles: base64 })
            }
          />
        </div>
        <Typography variant="h6" className={classes.fileInput}>
          {"上傳到： "}
        </Typography>
        <div className={classes.InputContent}>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            onChange={handleRadioChange}
            value={selected}
          >
            <FormControlLabel
              value="college"
              control={<Radio color="primary" />}
              label="系上"
            />
            <FormControlLabel
              value="liberal"
              control={<Radio color="primary" />}
              label="通識"
            />
            <FormControlLabel
              value="else"
              control={<Radio color="primary" />}
              label="課外"
            />
          </RadioGroup>
        </div>
        {selected === "college" ? (
          <div className={classes.selectContent}>
            <Autocomplete
              id="combo-box-demo"
              options={colleges}
              onChange={handleCollegeChange}
              autoSelect
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, value) => option.value === value.value}
              style={{ width: 175, marginLeft: 0 }}
              className={classes.fileInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="選擇科系"
                  variant="outlined"
                  className={classes.fileInput}
                />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              options={courseTypes}
              onChange={handleCourseTypeChange}
              autoSelect
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, value) => option.value === value.value}
              style={{ width: 140, marginLeft: 0 }}
              className={classes.fileInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="必/選/群修"
                  variant="outlined"
                  className={classes.fileInput}
                />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              options={grades}
              onChange={handleGradeChange}
              autoSelect
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, value) => option.value === value.value}
              style={{ width: 140, marginLeft: 0 }}
              className={classes.fileInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="選擇年級"
                  variant="outlined"
                  className={classes.fileInput}
                />
              )}
            />
          </div>
        ) : (
          <></>
        )}
        {selected === "liberal" ? (
          <div className={classes.selectContent}>
            <Autocomplete
              id="combo-box-demo"
              options={colleges}
              autoSelect
              getOptionLabel={(option) => option.title}
              style={{ width: 175, marginLeft: 0 }}
              className={classes.fileInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="選擇科系"
                  variant="outlined"
                  className={classes.fileInput}
                />
              )}
            />
            <Autocomplete
              id="combo-box-demo"
              options={courseTypes}
              autoSelect
              getOptionLabel={(option) => option.title}
              style={{ width: 140, marginLeft: 0 }}
              className={classes.fileInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="必/選/群修"
                  variant="outlined"
                  className={classes.fileInput}
                />
              )}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              required
              value={bookData.courseType}
              onChange={handleCourseType2Change}
              helperText="Please select your currency"
            >
              {courseTypes2.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        ) : (
          <></>
        )}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default CreateBook;
