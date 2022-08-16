import NewsFeedMain from "../components/news/NewsFeedMain";
import * as Types from "../models/Types";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

const NewsFeed = () => {
  const fetchedNews = useAppSelector((state: RootState) => state.news.newsList);
  let localNews: Types.INewsPosts[];
  const response = localStorage.getItem("news");
  response !== null
    ? (localNews = JSON.parse(response))
    : (localNews = fetchedNews);

  return <NewsFeedMain postList={localNews} />;
};

export default NewsFeed;
