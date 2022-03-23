import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Button, Divider, MenuItem, Stack, TextField } from "@mui/material";
import { blogCategories, blogSortBy } from "../../utils/categoryList";
import { useDispatch } from "react-redux";
import { getBlogList } from "../../actions/blogActions";

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
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function BlogFilter() {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(true);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(getBlogList({ category, sortBy }));
  }, []);

  const handleOnApply = () => {
    dispatch(getBlogList({ category, sortBy }));
  };

  const handleOnClear = () => {
    setCategory("");
    setSortBy("");
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={(e, newExpanded) => setExpanded(newExpanded)}
      >
        <AccordionSummary>
          <Typography>Filter Menu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} divider={<Divider />}>
            <TextField
              fullWidth
              variant="outlined"
              label="Category"
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {blogCategories.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              variant="outlined"
              label="Sort by"
              select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {blogSortBy.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.valueText}
                </MenuItem>
              ))}
            </TextField>

            <Stack spacing={1} direction="row">
              <Button fullWidth variant="outlined" onClick={handleOnClear}>
                Clear
              </Button>

              <Button fullWidth variant="contained" onClick={handleOnApply}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BlogFilter;
