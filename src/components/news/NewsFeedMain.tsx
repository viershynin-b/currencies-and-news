import NewsCard from "./NewsCard";
import { useAppSelector } from "../../store/hooks";
import { Grid } from "@mui/material";
import StyledNewsWrapper from "../../styles/StyledNewsWrapper";

const NewsFeedMain = () => {
  const postList = useAppSelector((state) => state.news.newsList);

  return (
    <StyledNewsWrapper>
      <Grid container spacing={2}>
        {postList?.map((post) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            xl={2}
            key={post.title}
            style={{ display: "flex" }}
            // applies the same height to all cards
          >
            <NewsCard
              title={post.title}
              author={post.author}
              urlToImg={post.urlToImage}
              description={post.description}
              url={post.url}
            />
          </Grid>
        ))}
      </Grid>
    </StyledNewsWrapper>
  );
};

export default NewsFeedMain;
