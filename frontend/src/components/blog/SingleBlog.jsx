import styled from "@emotion/styled";
import { ThumbUp } from "@mui/icons-material";
import { Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { API_HOST, UPVOTE_BLOG } from "../../constants/apiLinks";

const CoverPic = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  align-self: center;
`;

function SingleBlog({ item, userInfo }) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const [isUpVoted, setIsUpVoted] = useState(
    item.upvotes.includes(userInfo.id)
  );

  const [upvotes, setUpvotes] = useState(item.upvotes.length);

  const handleUpVoteClick = async () => {
    try {
      const res = await axios.post(
        `${UPVOTE_BLOG}/${item._id}`,
        { blogId: item._id },
        config
      );

      setUpvotes(res.data.data.blog.upvotes.length);

      setIsUpVoted(!isUpVoted);
    } catch (error) {
      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <Paper variant="outlined" sx={{ width: "100%", maxWidth: "800px" }}>
      <Stack spacing={2} p={2}>
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              {item.authorName}
            </Typography>
            <Chip
              variant="outlined"
              color="primary"
              label={item.blogCategory}
            />
          </Stack>
          <Typography variant="body1">
            {moment(Number(item.createdAt)).format(
              "dddd, MMMM Do, YYYY, h:mm a"
            )}
          </Typography>

          <Typography variant="body1">{upvotes} upvotes</Typography>
        </Stack>

        <Typography variant="h4" fontWeight={"bold"}>
          {item.blogTitle}
        </Typography>

        <CoverPic src={`${API_HOST}/${item.photo}`} />

        <Divider>
          <Chip label={"Content"} />
        </Divider>

        <div dangerouslySetInnerHTML={{ __html: item.blogBody }} />

        <Button
          onClick={handleUpVoteClick}
          variant={isUpVoted ? "contained" : "outlined"}
          sx={{ width: "20%" }}
        >
          <ThumbUp />
        </Button>
      </Stack>
    </Paper>
  );
}

export default SingleBlog;
