import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NewsCard from "./NewsCard";
import { Grid, Pagination } from "@mui/material";

import StyledNewsWrapper from "../../styles/StyledNewsWrapper";

import * as Types from "../../models/Types";

interface IPostList {
  postList: Types.INewsPosts[];
}

const NewsFeedMain = ({ postList }: IPostList) => {
  const navigation = useNavigate();

  const [page, setPage] = useState<number>(1);

  const newsOnPage = 6;
  const numberOfPages = Math.ceil(postList.length / newsOnPage);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const curPage = searchParams.get("page");

    curPage &&
    !isNaN(Number(curPage)) &&
    Number(curPage) <= numberOfPages &&
    Number(curPage) > 0
      ? setPage(Number(curPage))
      : navigation({
          pathname: "/news",
          search: "?page=1",
        });
  }, []);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    navigation({
      pathname: "/news",
      search: `?page=${value}`,
    });
  };

  return (
    <StyledNewsWrapper>
      <Grid container spacing={2} sx={{ width: { md: "850px", lg: "1046px" } }}>
        {postList
          ?.slice((page - 1) * newsOnPage, page * newsOnPage)
          ?.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              // md={6}
              lg={4}
              // xl={3}
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
      <Pagination
        count={numberOfPages}
        onChange={handlePaginationChange}
        showFirstButton
        showLastButton
        page={page}
        sx={{ mt: "15px", display: "flex", justifyContent: "center" }}
      />
    </StyledNewsWrapper>
  );
};

export default NewsFeedMain;
