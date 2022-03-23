import { ArrowForwardIos } from "@mui/icons-material";
import { Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function QuestionListItem({ item }) {
  const navigate = useNavigate();

  const onItemClick = () => {
    navigate(`/q-a/${item.id}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "1000px",
      }}
      onClick={onItemClick}
    >
      <CardActionArea
        sx={{
          width: "100%",
          maxWidth: "1000px",
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={"bold"}>
            {item.questionTitle}
          </Typography>

          <Typography variant="body2" color={"text.secondary"}>
            — {item.askedBy ? item.askedBy : "Anonymous"}
            {" at "}
            {moment(Number(item.createdAt)).format(
              "dddd, MMMM Do, YYYY, h:mm a"
            )}
          </Typography>

          <Typography variant="body2" color={"text.secondary"}>
            {item._answersId.length} Answers
          </Typography>
        </Stack>

        <Stack spacing={3} direction={"row"}>
          <Chip
            variant="outlined"
            color="primary"
            label={item.questionCategory}
          />
          <ArrowForwardIos color="primary" />
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default QuestionListItem;
