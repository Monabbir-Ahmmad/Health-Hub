import { Divider, Stack, Typography } from "@mui/material";

function BlogCommentItem({ item }) {
  return (
    <Stack direction={"row"} m={2} spacing={2} alignItems="center">
      <Stack spacing={2}>
        <Typography variant="body1" fontWeight={"bold"}>
          {item.name}
        </Typography>
      </Stack>

      <Divider orientation="vertical" flexItem />

      <Typography variant="body1" flex={1}>
        {item.comment}
      </Typography>

      <Stack spacing={1}></Stack>
    </Stack>
  );
}

export default BlogCommentItem;
