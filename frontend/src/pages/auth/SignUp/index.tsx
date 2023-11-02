import Container from "@mui/material/Container";
import { Col, Form, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../services/toaster.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      warningToast("Password and confirm password must be same");
    } else {
      const data = {
        name,
        password,
        email,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          data
        );

        if (response.data.status) {
          navigate("/");
          successToast(response.data.message);
        }
      } catch (error: any) {
        errorToast(error.response.data.error);
      }
    }
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Form onSubmit={registerSubmitHandler}>
            <TextField
              id="name"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Name"
              placeholder="Enter name here"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Email"
              placeholder="Enter email here"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Password"
              placeholder="Enter password here"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirm-password"
              variant="outlined"
              className="mb-4"
              required
              fullWidth
              label="Confirm Password"
              placeholder="Enter password again"
              autoFocus
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" variant="contained">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
