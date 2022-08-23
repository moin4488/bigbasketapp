import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface CustomizedDialogsProps {
  name: string;
  children?: React.ReactNode;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
  const { children, name } = props;
  // const [loginClosed, setLoginClosed] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setLoginClosed(false);
    // navigate("/");
  };

  return (
    <div>
      {name === "Register" && (
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          CheckOut
        </Button>
      )}

      {name === "Login" && (
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Login
        </Button>
      )}

      {name === "homeRegister" && (
        <button
          className="btn"
          style={{
            backgroundColor: "#fae6e6",
            border: "solid 1px",
            marginLeft: "20px",
          }}
          onClick={handleClickOpen}
        >
          <AccountCircleIcon />
          Login
        </button>
      )}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Login/SignUp
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {/* <div>Have an account?</div> */}
        {/* {loginClosed && <Button onClick={handleClose}>Login</Button>}
        {!loginClosed && (
          <LoginPopup>
            <Login />
          </LoginPopup>
        )} */}

        {/* <div onLoad={handleClose}><LoginPopup><Login/></LoginPopup></div> */}
      </BootstrapDialog>
    </div>
  );
}
