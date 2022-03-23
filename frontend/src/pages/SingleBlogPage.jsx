import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../actions/blogActions";
import BlogCommentField from "../components/blog/BlogCommentField";
import BlogCommentList from "../components/blog/BlogCommentList";
import SingleBlog from "../components/blog/SingleBlog";

function SingleBlogPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, blog } = useSelector((state) => state.singleBlog);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getSingleBlog(params.blogId));
  }, [dispatch, params.blogId]);

  return blog && Object.keys(blog).length ? (
    <Stack spacing={4} alignItems="center" p={4}>
      <SingleBlog item={blog} userInfo={userInfo} />

      {userInfo.role === "user" && <BlogCommentField blogId={params.blogId} />}

      <Typography variant="h5">Comments</Typography>

      <BlogCommentList blogId={params.blogId} />
    </Stack>
  ) : (
    <></>
  );
}

export default SingleBlogPage;
