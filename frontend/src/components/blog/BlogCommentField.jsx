import { Send } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBlogComment } from "../../actions/blogActions";
import { postAnswer } from "../../actions/queAnsActions";

function BlogCommentField({ blogId }) {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.writeBlogComment
  );

  useEffect(() => {
    setComment("");
  }, [success]);

  const handleCommentSubmit = () => {
    if (comment && blogId) {
      dispatch(postBlogComment(blogId, comment));
    }
  };

  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "780px",
      }}
    >
      <InputBase
        multiline
        placeholder="Write comment here"
        sx={{ pl: 2, flex: 1 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconButton
        sx={{ p: "10px" }}
        color="primary"
        onClick={handleCommentSubmit}
      >
        <Send />
      </IconButton>
    </Paper>
  );
}

export default BlogCommentField;
