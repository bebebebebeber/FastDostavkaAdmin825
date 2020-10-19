import React, { Component } from "react";
import PropTypes, { object } from "prop-types";
import { connect } from "react-redux";
import * as loginActions from "./reducer";
import get from "lodash.get";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupPrepend,
  InputGroupText,
  Row,
} from "reactstrap";

import { FormHelperText } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
//import Button from '@material-ui/core/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import photo from "../../../assets/img/photoLogin.jpg";
import "./style.css";
function LoadErrors(err) {
  if (typeof err != "object") {
    return <FormHelperText error>{err}</FormHelperText>;
  }
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {"JobJoin "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
class Login extends Component {
  state = {
    email: "",
    password: "",
    profileUrl: "",
    errors: {},
    done: false,
    isLoading: false,
    errorsServer: "",
    iconInput: "eye-slash",
    typeInput: "password",
  };

  mouseEnter = () => {
    this.setState({
      iconInput: "eye",
      typeInput: "text",
    });
  };

  mouseLeave = () => {
    this.setState({
      iconInput: "eye-slash",
      typeInput: "password",
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return { isLoading: nextProps.loading, errorsServer: nextProps.errors };
  }

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors,
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    let errors = {};

    if (email === "") errors.email = "Поле є обов'язковим";

    if (password === "") errors.password = "Поле є обов'язковим";

    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        password: password,
      };

      this.props.loginM(model, this.props.history);
    } else {
      this.setState({ errors });
    }
  };

  render() {
    //console.log(loginActions);
    const { iconInput, typeInput } = this.state;
    const {
      errors,
      isLoading,
      profileUrl,
      visible,
      errorsServer,
      done,
    } = this.state;
    console.log("us", this.props.login);
    if (this.props.login.isAuthenticated) {
      let t = this.props.getUrlToRedirect();
    }
    const form = (
      <Container style={{ height: "100vh" }}>
        <Row
          style={{ height: "100%" }}
          className="justify-content-center align-items-center"
        >
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={this.onSubmitForm}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      {LoadErrors(errorsServer)}
                      {typeof errorsServer !== "object" ? (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          error
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={this.handleChange}
                          autoComplete="email"
                          autoFocus
                        />
                      ) : (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          onChange={this.handleChange}
                          autoComplete="email"
                          autoFocus
                        />
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      {typeof errorsServer !== "object" ? (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          error
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          onChange={this.handleChange}
                          autoComplete="current-password"
                        />
                      ) : (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          onChange={this.handleChange}
                          autoComplete="current-password"
                        />
                      )}
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      // <Grid container component="main" className="root">
      //   <CssBaseline />
      //   <Grid item xs={false} sm={4} md={7} style={{ backgroundImage: 'url(' + photo + ')' }} />
      //   <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      //     <div className="paper">
      //       <Avatar className="avatar">
      //         <LockOutlinedIcon />
      //       </Avatar>
      //       <Typography component="h1" variant="h5">
      //         Sign in
      //     </Typography>
      //       <form className="form" onSubmit={this.onSubmitForm}>
      //         {LoadErrors(errorsServer)}
      //         {typeof errorsServer !== 'object' ?
      //         <React.Fragment>
      //           <TextField
      //             variant="outlined"
      //             margin="normal"
      //             required
      //             fullWidth
      //             error
      //             id="email"
      //             label="Email Address"
      //             name="email"
      //             onChange={this.handleChange}
      //             autoComplete="email"
      //             autoFocus
      //           />
      //           <TextField
      //             variant="outlined"
      //             margin="normal"
      //             required
      //             fullWidth
      //             error
      //             name="password"
      //             label="Password"
      //             type="password"
      //             id="password"
      //             onChange={this.handleChange}
      //             autoComplete="current-password"
      //           />
      //         </React.Fragment>
      //        :

      //         <React.Fragment>
      //           <TextField
      //             variant="outlined"
      //             margin="normal"
      //             required
      //             fullWidth

      //             id="email"
      //             label="Email Address"
      //             name="email"
      //             onChange={this.handleChange}
      //             autoComplete="email"
      //             autoFocus
      //           />
      //           <TextField
      //             variant="outlined"
      //             margin="normal"
      //             required
      //             fullWidth

      //             name="password"
      //             label="Password"
      //             type="password"
      //             id="password"
      //             onChange={this.handleChange}
      //             autoComplete="current-password"
      //           />
      //         </React.Fragment>
      //       }

      //       <Button
      //           type="submit"
      //           fullWidth
      //           variant="contained"
      //           color="primary"
      //         >
      //           Sign In
      //       </Button>
      //         <Grid container>
      //           <Grid item xs>
      //             <Link to="#" variant="body2">
      //               Forgot password?
      //           </Link>
      //           </Grid>
      //           <Grid item>
      //             <Link to="/register" >
      //               {"Don't have an account? Sign Up"}
      //             </Link>
      //           </Grid>
      //         </Grid>
      //         <Box mt={5}>
      //           <Copyright />
      //         </Box>
      //       </form>
      //     </div>
      //   </Grid>
      // </Grid>
    );
    // if (isLoading == true) {
    //   return <Loader />;
    // }
    return form;
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: get(state, "login.post.loading"),
    failed: get(state, "login.post.failed"),
    success: get(state, "login.post.success"),
    errors: get(state, "login.post.errors"),
    login: get(state, "login"),
  };
}

const mapDispatch = {
  loginM: (model, history) => {
    return loginActions.login(model, history);
  },
  getUrlToRedirect: () => {
    return loginActions.getUrlToRedirect();
  },
};

export default connect(mapStateToProps, mapDispatch)(Login);
