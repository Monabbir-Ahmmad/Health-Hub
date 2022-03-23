import { Alert, Grid, LinearProgress, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PersonalQuestion from "../components/que_ans/PersonalQuestions";
import QuestionField from "../components/que_ans/QuestionField";
import QuestionFilter from "../components/que_ans/QuestionFilter";
import QuestionListItem from "../components/que_ans/QuestionListItem";

function QueAnsPage() {
  const { loading, error, questions } = useSelector(
    (state) => state.questionList
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Grid container spacing={4} p={4} columns={{ xs: 1, md: 9 }}>
      <Grid item xs={1} md={2}>
        <QuestionFilter />
      </Grid>
      <Grid item xs={1} md={5} display="flex">
        <Stack spacing={4} width={"100%"} alignItems={"center"}>
          <QuestionField />

          {loading && <LinearProgress sx={{ width: "100%" }} />}

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}

          {questions.map((item, index) => (
            <QuestionListItem key={index} item={item} />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={1} md={2}>
        {userInfo.role === "user" && <PersonalQuestion />}
      </Grid>
    </Grid>
  );
}

export default QueAnsPage;
