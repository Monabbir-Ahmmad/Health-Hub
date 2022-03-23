import styled from "@emotion/styled";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputBase,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writeBlog } from "../actions/blogActions";
import RichEditor from "../components/RichEditor";
import { blogCategories } from "../utils/categoryList";

const CoverPic = styled.img`
  width: 100%;
  max-height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const Label = styled.label`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

function BlogCreatePage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [valueMissing, setValueMissing] = useState(false);
  const [blogBody, setBlogBody] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [image, setImage] = useState(null);

  const { loading, error, success } = useSelector((state) => state.postBlog);

  useEffect(() => {
    if (success) {
      setValueMissing(false);

      navigate("/blogs");
    }
  }, [navigate, success]);

  const onEditorChange = (value) => {
    setBlogBody(value);
  };

  const onFileSelect = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostClick = () => {
    if (blogTitle && blogCategory && blogBody && blogBody !== "<p><br></p>") {
      const values = {
        blogTitle,
        blogCategory,
        blogBody,
      };

      const formData = new FormData();

      Object.keys(values).forEach((item) => {
        formData.append([item], values[item]);
      });

      if (image) {
        formData.append("image", image);
      }

      dispatch(writeBlog(formData));
    } else {
      setValueMissing(true);
    }
  };

  return (
    <Stack padding={4} bgcolor={"#fff"} alignItems="center">
      <Stack spacing={4} maxWidth="800px">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <CoverPic
            src={
              image
                ? URL.createObjectURL(image)
                : "https://healthtechmagazine.net/sites/healthtechmagazine.net/files/styles/cdw_hero/public/articles/%5Bcdw_tech_site%3Afield_site_shortname%5D/202007/20200630_HT_Web_MonITor_Tech-Organizations-Should-Consider.jpg?"
            }
          />

          <Label htmlFor="contained-button-file">
            <InputBase
              id="contained-button-file"
              type={"file"}
              name="image"
              accept=".png, .jpg, .jpeg"
              onChange={onFileSelect}
              sx={{ display: "none" }}
            />
            <Button
              fullWidth
              variant="contained"
              component="span"
              color={"primary"}
            >
              Upload cover image
            </Button>
          </Label>

          {image && (
            <IconButton
              color="error"
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => setImage(null)}
            >
              <Delete />
            </IconButton>
          )}
        </Box>

        <Stack spacing={2} direction="row">
          <TextField
            fullWidth
            variant="outlined"
            label="Blog Title"
            error={valueMissing && !blogTitle}
            helperText={
              valueMissing && !blogTitle ? "Please write your blog title" : ""
            }
            onChange={(e) => setBlogTitle(e.target.value)}
            defaultValue=""
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Select Category"
            select
            error={valueMissing && !blogCategory}
            helperText={
              valueMissing && !blogCategory
                ? "Please select your question category"
                : ""
            }
            onChange={(e) => setBlogCategory(e.target.value)}
            defaultValue=""
          >
            {blogCategories.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <RichEditor onEditorChange={onEditorChange} />

        <Button variant="contained" size="large" onClick={handlePostClick}>
          Post your blog
        </Button>

        {loading && <LinearProgress />}

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Stack>
  );
}

export default BlogCreatePage;
