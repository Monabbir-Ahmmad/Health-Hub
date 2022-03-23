import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleQuestion } from "../actions/queAnsActions";
import AnswerField from "../components/que_ans/AnswerField";
import AnswerList from "../components/que_ans/AnswerList";
import SingleQuestion from "../components/que_ans/SingleQuestion";

function SingleQnAPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, question } = useSelector(
    (state) => state.singleQuestion
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getSingleQuestion(params.questionId));
  }, [dispatch, params.questionId]);

  return question && Object.keys(question).length ? (
    <Stack spacing={4} alignItems="center" p={4}>
      <SingleQuestion item={question} />
      {userInfo.role === "doctor" && (
        <AnswerField questionId={params.questionId} />
      )}
      <Typography variant="h5">Answers</Typography>

      <AnswerList answers={question._answersId} />
    </Stack>
  ) : (
    <></>
  );
}

export default SingleQnAPage;
