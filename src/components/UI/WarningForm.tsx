import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { Fingerprint } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import TextScroller from "./TextScroller";
import { Fab } from "@mui/material";
import LoginForm from "./LoginForm";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IWarningForm {
  title: string;
  open: boolean;
  onCancel: (props: boolean) => void;
}

const WarningForm = (props: IWarningForm) => {
  const [loginStarted, setLoginStarted] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const cancelHandler = () => {
    props.onCancel(false);
    navigate("/news", { replace: true });
  };
  const LoginHandler = () => {
    setLoginStarted((prevState) => !prevState);
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "20px",
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={cancelHandler}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", overflow: "hidden" }}>
          <Toolbar sx={{ bgcolor: `${theme.palette.error.main}` }}>
            <Typography
              sx={{ alignItems: "center" }}
              variant="h6"
              component="div"
            >
              <TextScroller
                text={`${props.title} Error: Unauthorized user. Access denied. Login and try again.`}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={actionsStyle}>
          <Fab
            variant="extended"
            size="medium"
            sx={{
              width: "220px",
              color: "white",
              bgcolor: "#d8464d;",
              "&:hover": { bgcolor: "#d8464d;" },
            }}
            onClick={cancelHandler}
          >
            <CloseIcon />
            Stay anonymous
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            sx={{
              width: "220px",
              color: "white",
              bgcolor: "#4297A0",
              "&:hover": { bgcolor: "#4297A0" },
            }}
            onClick={LoginHandler}
          >
            <Fingerprint />
            Proceed to login
          </Fab>
        </div>
      </Dialog>
      <LoginForm
        isActive={loginStarted}
        onLogOut={setLoginStarted}
        onWarningClose={() => props.onCancel(false)}
        curUrl={window.location.pathname}
      />
    </div>
  );
};

export default WarningForm;
