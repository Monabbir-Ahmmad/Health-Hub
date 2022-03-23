import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

function SingleQuestion({ item }) {
  return (
    <Paper sx={{ width: "100%", maxWidth: "800px" }}>
      <Stack spacing={2} pb={2}>
        <Stack spacing={1} bgcolor="#f3f3f3" py={1} px={2}>
          <Typography variant="h6">
            {item.askedBy ? item.askedBy : "Anonymous"}
          </Typography>
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Chip
              variant="outlined"
              color="primary"
              label={item.questionCategory}
            />
            <Typography variant="body1">
              {moment(Number(item.createdAt)).format(
                "dddd, MMMM Do, YYYY, h:mm a"
              )}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h4" fontWeight={"bold"} px={2}>
          {item.questionTitle}
        </Typography>
        <Divider />

        <Typography variant="body1" px={2}>
          {item.questionBody}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default SingleQuestion;
