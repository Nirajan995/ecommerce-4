import Container from "@mui/material/Container";
import { Col, Form, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { object, string } from "yup";
import { AuthInterface } from "../../../interface/auth.interface";
import { postData } from "../../../services/axios.service";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../services/toaster.service";
import { useDispatch } from "react-redux";
import { login } from "../../../slice/authSlice";

const Login = () => {
  let initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  let authValidationSchema = object({
    email: string().email().required("Email is a required field."),
    password: string()
      .min(8, "Minimum length of password should be 8")
      .required("Password is a required field."),
  });

  const loginHandler = async (values: AuthInterface) => {
    const resp = await postData("/auth/login", values);

    if (resp.status === "success") {
      const data = {
        jwt: resp.token,
        role: resp.authData.role,
        email: resp.authData.email,
        name: resp.authData.name,
      };
      dispatch(login(data));

      if (resp.authData.role === "admin") {
        navigate("/products");
      } else if (resp.authData.role === "user") {
        navigate("/all/products");
      }

      successToast("User logged in successfully");
    }
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={authValidationSchema}
            onSubmit={loginHandler}
          >
            {({ handleChange, handleSubmit, errors, touched, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    required
                    onBlur={handleBlur}
                    fullWidth
                    label="Email"
                    placeholder="Enter email here"
                    autoFocus
                    onChange={handleChange}
                  />

                  <span className="text-danger">
                    {touched.email && errors.email}
                  </span>
                </div>

                <div className="mb-4">
                  <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    required
                    fullWidth
                    onBlur={handleBlur}
                    label="Password"
                    placeholder="Enter password here"
                    onChange={handleChange}
                  />
                  <span className="text-danger">
                    {touched.password && errors.password}
                  </span>
                </div>

                <Button type="submit" variant="contained">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
