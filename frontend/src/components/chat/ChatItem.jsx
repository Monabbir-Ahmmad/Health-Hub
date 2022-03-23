import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { API_HOST } from "../../constants/apiLinks";
import moment from "moment";

function ChatItem({ message }) {
  return (
    <Stack
      direction={message.isReceived ? "row" : "row-reverse"}
      alignSelf={message.isReceived ? "start" : "end"}
      spacing={1}
    >
      <Avatar
        alt="image"
        src={`${API_HOST}/${message.senderPic}`}
        sx={{ width: 30, height: 30, alignSelf: "end", mb: 1 }}
      />
      <Stack alignItems={message.isReceived ? "start" : "end"}>
        <Paper
          variant={"outlined"}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: message.isReceived ? "start" : "end",
            color: message.isReceived ? "text.primary" : "#fff",
            bgcolor: message.isReceived ? "#fff" : "primary.main",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottomLeftRadius: message.isReceived ? "0px" : "10px",
            borderBottomRightRadius: message.isReceived ? "10px" : "0px",
          }}
        >
          <Typography variant="body1" fontWeight={"bold"}>
            {message.sender}
          </Typography>

          <pre style={{ fontFamily: "inherit", margin: 0 }}>
            <Typography variant="body1">{message.text}</Typography>
          </pre>
        </Paper>

        <Typography variant="caption" color={"text.secondary"}>
          {moment(Number(message.timestamp)).fromNow()}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default ChatItem;
