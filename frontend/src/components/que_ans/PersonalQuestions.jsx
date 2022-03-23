import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { CardActionArea, Chip, Divider, Stack } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPersonalQuestions } from "../../actions/queAnsActions";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function PersonalQuestion() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(true);

  const { loading, error, questions } = useSelector(
    (state) => state.personalQuestions
  );

  useEffect(() => {
    dispatch(getPersonalQuestions());
  }, [dispatch]);

  const handleItemClick = (item) => {
    navigate(`/q-a/${item.id}`);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={(e, newExpanded) => setExpanded(newExpanded)}
      >
        <AccordionSummary>
          <Typography>Your Questions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack divider={<Divider />}>
            {questions.map((item, index) => (
              <CardActionArea
                key={index}
                sx={{ p: 2 }}
                onClick={() => handleItemClick(item)}
              >
                <Typography variant="body1" fontWeight={"bold"}>
                  {item.questionTitle}
                </Typography>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={item.questionCategory}
                  sx={{ mt: 2 }}
                />
              </CardActionArea>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default PersonalQuestion;
