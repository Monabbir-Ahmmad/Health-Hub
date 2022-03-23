import { Divider, Paper, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogComments } from "../../actions/blogActions";
import BlogCommentItem from "./BlogCommentItem";

function BlogCommentList({ blogId }) {
  const dispatch = useDispatch();

  const { loading, error, blogComments } = useSelector(
    (state) => state.singleBlogComments
  );

  useEffect(() => {
    dispatch(getBlogComments(blogId));
  }, [dispatch, blogId]);

  return (
    <Paper sx={{ width: "100%", maxWidth: "800px" }}>
      <Stack divider={<Divider />}>
        {blogComments.length &&
          blogComments.map((ans, index) => (
            <BlogCommentItem key={index} item={ans} />
          ))}
      </Stack>
    </Paper>
  );
}

export default BlogCommentList;
