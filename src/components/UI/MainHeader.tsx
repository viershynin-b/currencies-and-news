import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { authActions } from "../../store/auth-slice";

import { NavLink, useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";

import StyledMainHeader from "../../styles/StyledMainHeader";
import { AppBar, Toolbar, Button } from "@mui/material";
import {
  Fingerprint,
  TravelExplore,
  CurrencyExchange,
} from "@mui/icons-material";

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLogInActive, setLogInActive] = useState(false);
  const [urlToOpen, setUrlToOpen] = useState<string>(window.location.pathname);

  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const handleLogIn = () => {
    setLogInActive((prevState) => !prevState);
    setUrlToOpen(window.location.pathname);
  };

  const handleLogOut = () => {
    dispatch(authActions.userLogInLogOut());
    navigate("/news", { replace: true });
  };

  const handleSideLogIn = (url: string) => {
    setUrlToOpen(url);
    setLogInActive((prevState) => !prevState);
  };

  return (
    <>
      <StyledMainHeader isLoggedIn={isLoggedIn}>
        <AppBar color="secondary">
          <Toolbar className="toolbar">
            <nav>
              <NavLink
                to="/news"
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <Button variant="text" startIcon={<TravelExplore />}>
                  News
                </Button>
              </NavLink>

              <NavLink
                to={isLoggedIn ? "/convertor" : "#"}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <Button
                  id="convertor-btn"
                  variant="text"
                  startIcon={<CurrencyExchange />}
                  onClick={
                    !isLoggedIn
                      ? () => handleSideLogIn("/convertor")
                      : undefined
                  }
                >
                  Convertor
                </Button>
              </NavLink>
            </nav>
            <div>
              <Button
                startIcon={<Fingerprint />}
                variant="contained"
                color={!isLoggedIn ? "success" : "error"}
                onClick={!isLoggedIn ? handleLogIn : handleLogOut}
              >
                {!isLoggedIn ? "LOGIN" : "LOGOUT"}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </StyledMainHeader>
      <LoginForm
        isActive={isLogInActive}
        onLogOut={setLogInActive}
        curUrl={urlToOpen}
      />
    </>
  );
};

export default MainHeader;
