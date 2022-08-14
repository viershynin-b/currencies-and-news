import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  isActive: boolean;
  curUrl: string;
  onLogOut: (props: boolean) => void;
  onWarningClose?: () => void;
}

const LoginForm = (props: ILoginForm) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const abortionCancelHandler = () => {
    setEmail("");
    setPassword("");
    props.onLogOut(false);
  };

  const nameIsNotEmpty = password?.trim() !== "";
  const emailIsNotEmpty = email?.trim() !== "" && email.includes("@");
  const inputIsNotEmpty = nameIsNotEmpty && emailIsNotEmpty;

  const userList = useAppSelector((state: RootState) => state.auth.userList);

  const onLoginHandler = () => {
    const userData = {
      email,
      password,
    };
    const inputIsValid = userList.some(
      (item) => JSON.stringify(item) === JSON.stringify(userData)
    );
    inputIsValid
      ? dispatch(authActions.userLogInLogOut())
      : alert("Please, enter valid data");
    abortionCancelHandler();
    navigate(props.curUrl || "");
    if (props.onWarningClose) props.onWarningClose();
  };

  return (
    <>
      <Dialog open={props.isActive} onClose={abortionCancelHandler}>
        <DialogContent>
          <DialogContentText>
            For further steps the authentification is needed:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
            placeholder="Sincere@april.biz"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="dense"
            id="Password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
            placeholder="Kulas Light"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={abortionCancelHandler} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onLoginHandler}
            disabled={!inputIsNotEmpty}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;
