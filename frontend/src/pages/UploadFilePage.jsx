import styled from "@emotion/styled";
import { Button, Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_HOST } from "../constants/apiLinks";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled(Paper)`
  flex: 1;
  max-width: 500px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 40px;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #026bce;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
`;

const InputLabel = styled.label`
  text-align: left;
  font-weight: 500;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid lightgray;
  padding: 15px 20px;
  border-radius: 5px;
`;

function UploadFilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedImage) {
      console.log(selectedImage);
      const formData = new FormData();

      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("image", selectedImage[i]);
      }

      const res = await axios.post(`${API_HOST}/api/upload`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      console.log(res.data);
    }
  };

  const onFileSelect = (e) => {
    setSelectedImage(e.target.files);
  };

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <CardContainer>
        <Title>SIGN UP</Title>

        <InputContainer>
          <InputLabel>Name</InputLabel>
          <Input placeholder="Enter your name" />
        </InputContainer>

        <InputContainer>
          <InputLabel>Email</InputLabel>
          <Input placeholder="Enter your email address" type="email" />
        </InputContainer>

        <InputContainer>
          <InputLabel>Phone</InputLabel>
          <Input placeholder="Enter your phone number" type="tel" />
        </InputContainer>

        <InputContainer>
          <InputLabel>Password</InputLabel>
          <Input
            placeholder="Enter your name"
            type={showPassword ? "text" : "password"}
          />
          <label>
            Show password{" "}
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
          </label>
        </InputContainer>

        <InputContainer>
          <InputLabel>Upload file</InputLabel>
          <Input
            type={"file"}
            name="myImage"
            accept="image/*"
            onChange={onFileSelect}
            multiple
          />
        </InputContainer>

        <Button variant="contained" fullWidth>
          Submit
        </Button>
      </CardContainer>
    </FormContainer>
  );
}

export default UploadFilePage;
