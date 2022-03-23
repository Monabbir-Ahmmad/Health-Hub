import { Send } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAnswer } from "../../actions/queAnsActions";

function AnswerField({ questionId }) {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  const { loading, error, success } = useSelector((state) => state.writeAnswer);

  useEffect(() => {
    setAnswer("");
  }, [success]);

  const handleAnswerSubmit = () => {
    if (answer && questionId) {
      dispatch(postAnswer(questionId, answer));
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
        placeholder="Write answer here"
        sx={{ pl: 2, flex: 1 }}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <IconButton
        sx={{ p: "10px" }}
        color="primary"
        onClick={handleAnswerSubmit}
      >
        <Send />
      </IconButton>
    </Paper>
  );
}

export default AnswerField;
