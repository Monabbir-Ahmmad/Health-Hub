import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuestion } from "../../actions/queAnsActions";
import { questionCategories } from "../../utils/categoryList";

function QuestionField() {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const [valueMissing, setValueMissing] = useState(false);
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const { loading, success, error } = useSelector((state) => state.askQuestion);

  useEffect(() => {
    if (success) {
      handleDialogClose();
    }
  }, [success]);

  const handleDialogClose = () => {
    setQuestionTitle("");
    setQuestionBody("");
    setQuestionCategory("");
    setAnonymous(false);
    setShowDialog(false);
    setValueMissing(false);
  };

  const handlePost = () => {
    if (questionCategory && questionBody && questionTitle) {
      dispatch(
        postQuestion({
          questionTitle,
          questionBody,
          questionCategory,
          anonymous,
        })
      );
      setValueMissing(false);
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Stack p={3} spacing={2}>
        <Typography variant="h5">Ask Questions</Typography>

        <Button
          variant="outlined"
          size="large"
          onClick={() => setShowDialog(true)}
        >
          What's on your mind?
        </Button>

        <Dialog fullWidth open={showDialog} onClose={handleDialogClose}>
          <DialogTitle>Ask Your Question</DialogTitle>

          <DialogContent>
            <Stack spacing={4} py={1}>
              {loading && <LinearProgress />}

              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                variant="standard"
                label="Question Title"
                error={valueMissing && !questionTitle}
                helperText={
                  valueMissing && !questionTitle
                    ? "Please write your question title"
                    : ""
                }
                onChange={(e) => setQuestionTitle(e.target.value)}
                defaultValue=""
              />

              <TextField
                multiline
                minRows={4}
                variant="standard"
                placeholder="Write your question description"
                error={valueMissing && !questionBody}
                helperText={
                  valueMissing && !questionBody
                    ? "Please write your question description"
                    : ""
                }
                onChange={(e) => setQuestionBody(e.target.value)}
                defaultValue=""
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Select Category"
                select
                error={valueMissing && !questionCategory}
                helperText={
                  valueMissing && !questionCategory
                    ? "Please select your question category"
                    : ""
                }
                onChange={(e) => setQuestionCategory(e.target.value)}
                defaultValue=""
              >
                {questionCategories.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    onChange={(e) => setAnonymous(e.target.checked)}
                  />
                }
                label="Ask anonymously"
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handlePost}>Post</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
}

export default QuestionField;
