import { Divider, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import AnswerItem from "./AnswerItem";

function AnswerList({ answers }) {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Paper sx={{ width: "100%", maxWidth: "800px" }}>
      <Stack divider={<Divider />}>
        {answers.map((ans, index) => (
          <AnswerItem key={index} item={ans} userInfo={userInfo} />
        ))}
      </Stack>
    </Paper>
  );
}

export default AnswerList;
