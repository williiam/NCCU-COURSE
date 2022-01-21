import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog({open, setOpen, response}) {
  // const [open, setOpen] = React.useState(open);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(response?.status!==201 || response?.data.length===0){
    return ( <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"取得課程資料失敗"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {response?.status!==201?"網路連線錯誤":"創建評價失敗"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>        
          <Button onClick={handleClose} color="primary" autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
  }

  const course=response?.data[0];

  const handleCreateResource = () => {
    //可以先把課程資料存到redux裡
    history.push(`/createCourseResource/${course.course}`)
  }

  const handleCreateGuide = () => {
    history.push(`/createCourseFeedback/${course.course}`)
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"以下是您選擇的課程"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            科目代碼:{course.course}<br></br>
            科目名稱:{course.courseNameZH_TW}<br></br>
            教師姓名:{course.instructorZH_TW}<br></br>
            總評分:{course.semester.toString().slice(0,3)+"/"+"上"}<br></br>            
            甜度:{course.courseNameZH_TW}<br></br>
            涼度:{course.instructorZH_TW}<br></br>
            收穫{course.point}<br></br>
            懶人包:{course.sessionZH_TW}<br></br>
            課程評價:{course.departmentZH_TW}<br></br>                   
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
            取消
          </Button>
          <Button autoFocus onClick={(course)=>handleCreateResource(course)} color="primary">
            新增此課程的學習資源
          </Button>
          <Button onClick={(course)=>handleCreateGuide(course)} color="primary" autoFocus>
            新增此課程的修課攻略
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
