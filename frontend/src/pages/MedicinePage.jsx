import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_HOST } from "../constants/apiLinks";

function MedicinePage() {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const [searchText, setSearchText] = useState("");

  const [searchResult, setSearchResult] = useState(null);

  const handleSearchClick = async () => {
    try {
      const res = await axios.get(
        `${API_HOST}/api/drugs?drugName=${searchText}`,
        config
      );
      setSearchResult(res.data.drug);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack p={4} spacing={4} alignItems={"center"}>
      <Typography variant="h4">Search For Medicine Info</Typography>

      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
          maxWidth: 800,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: "10px" }} onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          maxWidth: 800,
          alignSelf: "center",
        }}
      >
        <Stack divider={<Divider />}>
          {searchResult &&
            Object.keys(searchResult).map((key, index) => (
              <Stack key={index} p={4} spacing={2}>
                <Typography variant="h5" color={"primary"} fontWeight="bold">
                  {key.replace("_", " ")}
                </Typography>
                <Typography>
                  {searchResult[key].replace("\\n", "\n")}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default MedicinePage;
