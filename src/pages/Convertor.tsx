import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { fetchPrivatAPI } from "../APIs";

import WarningForm from "../components/UI/WarningForm";
import ConvertorMain from "../components/convertor/ConvertorMain";

import LinearProgress from "@mui/material/LinearProgress";

const Convertor = () => {
  useEffect(() => {
    (async () => {
      const res = await fetchPrivatAPI();
      res.length === 4
        ? setAreCurRatesLoaded(true)
        : setAreCurRatesLoaded(false);
    })();
  }, []);

  const access = useAppSelector((state: RootState) => state.auth.isLoggedIn);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areCurRatesLoaded, setAreCurRatesLoaded] = useState(false);

  useEffect(() => {
    const isUserAuthenticated = sessionStorage.getItem("isUserAuthenticated");

    isUserAuthenticated ? setIsAuthenticated(true) : setIsModalOpen(true);
  }, [access]);

  const accessOpen = isAuthenticated && areCurRatesLoaded;

  const getContent = () => {
    if (isModalOpen) {
      return (
        <WarningForm
          open={isModalOpen}
          onCancel={setIsModalOpen}
          title="Convertor Page"
        />
      );
    }
    if (accessOpen) {
      return <ConvertorMain />;
    }
    return <LinearProgress color="secondary" />;
  };

  return <>{getContent()}</>;
};

export default Convertor;
