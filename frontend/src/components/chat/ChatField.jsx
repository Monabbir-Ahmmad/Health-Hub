import { AttachFile, Send } from "@mui/icons-material";
import { IconButton, InputBase, Paper, Stack } from "@mui/material";
import { useState } from "react";

function ChatField({ handleChatSend }) {
  const [chatText, setChatText] = useState("");

  const handleMsgSend = () => {
    handleChatSend(chatText.trim());
    setChatText("");
  };
  return (
    <Paper
      sx={{
        alignSelf: "center",
        position: "fixed",
        bottom: "2rem",
        left: "2rem",
        right: "2rem",
      }}
    >
      <Stack spacing={1} p={1} direction={"row"}>
        <IconButton sx={{ p: 1, alignSelf: "flex-end" }} color="primary">
          <AttachFile />
        </IconButton>
        <InputBase
          multiline
          maxRows={4}
          placeholder="Write here"
          sx={{ p: 1, flex: 1, overflowY: "auto", bgcolor: "#fff" }}
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
        />
        <IconButton
          disabled={chatText.trim() ? false : true}
          sx={{ p: 1, alignSelf: "flex-end" }}
          color="primary"
          onClick={handleMsgSend}
        >
          <Send />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default ChatField;
