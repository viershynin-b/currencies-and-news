import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { fetchUser } from "./store/auth-slice";
// import { fetchNews } from "./store/news-slice";
// commenting that out you activate BBC API, keep in mind that it provide 100 free call / per day only
import { newsActions } from "./store/news-slice";

import NewsFeed from "./pages/NewsFeed";
import Convertor from "./pages/Convertor";
import MainHeader from "./components/UI/MainHeader";

import { MOCK_DATA } from "./GLOBAL_VARS";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(fetchNews())
    // commenting that out you activate BBC API, keep in mind that it provide 100 free call / per day only
    dispatch(newsActions.addPosts(MOCK_DATA));
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="news" element={<NewsFeed />} />
          <Route path="convertor" element={<Convertor />} />
          <Route path="*" element={<Navigate to="news" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
