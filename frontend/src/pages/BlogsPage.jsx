import { Alert, Button, Grid, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogFilter from "../components/blog/BlogFilter";
import BlogListItem from "../components/blog/BlogListItem";
import PersonalBlog from "../components/blog/PersonalBlog";

function BlogsPage() {
  const navigate = useNavigate();

  const { loading, error, blogs } = useSelector((state) => state.blogList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleWriteBlogClick = () => {
    navigate("/blogs/create");
  };

  return (
    <Grid container spacing={4} p={4} columns={{ xs: 1, md: 9 }}>
      <Grid item xs={1} md={2}>
        <BlogFilter />
      </Grid>
      <Grid item xs={1} md={5} display="flex">
        <Stack spacing={2} width={"100%"} alignItems={"center"}>
          {userInfo.role === "doctor" && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleWriteBlogClick}
            >
              Write you own blog
            </Button>
          )}

          {loading && <LinearProgress sx={{ width: "100%" }} />}

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}

          <Grid container columns={{ xs: 1, md: 2 }}>
            {blogs.map((item, index) => (
              <Grid item xs={1} key={index} p={1}>
                <BlogListItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={1} md={2}>
        {userInfo.role === "doctor" && <PersonalBlog />}
      </Grid>
    </Grid>
  );
}

export default BlogsPage;
