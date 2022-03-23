import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { API_HOST } from "../../constants/apiLinks";
import { Box } from "@mui/system";

function DoctorItem({ item, onItemClick }) {
  return (
    <Card onClick={() => onItemClick(item)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={250}
          image={`${API_HOST}/${item.profileImage}`}
          alt={item.name}
        />
      </CardActionArea>

      <CardContent>
        <Typography variant="h6" mb={2}>
          {item.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {item.qualifications.map((q, index) => (
            <Chip key={index} label={q} variant="outlined" />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {item.specializations.map((s, index) => (
            <Chip key={index} label={s} color="primary" variant="outlined" />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={() => onItemClick(item)} fullWidth size="large">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorItem;
