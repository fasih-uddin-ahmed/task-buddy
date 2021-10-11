import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBAnimation
} from "mdbreact";
import "./index.css";
import { toast } from 'react-toastify';
//we are importing this file to make our input fields work clean and easy to view
// import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  //gonna make component state
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //we are checking if someone tries to access login page when he is login...then we will not allow him
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //if user enters valid email and password then we will pass him to dashboard
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      toast.success('Successfully logged in');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    //here we are calling loginUser action with input data
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div id="classicformpage">
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBAnimation
                  type="fadeinLeft"
                  delay=".3s"
                  className="text-white text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1 className="h1-responsive font-weight-bold">
                    Sign in to your TaskBuddy account
                  </h1>
                  <hr className="hr-light" color="white" />
                  <h6 className="mb-4">
                    Trello’s boards, lists, and cards enable you to organize and
                prioritize your projects in a fun, flexible, and rewarding way.
                  </h6>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <br />
                    <br />
                    <br />
                    <br />
                    <MDBCard id="classic-card">
                      <MDBCardBody className="text-white">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Login:
                        </h3>
                        <hr className="hr-light" color="white" />

                        <p className="lead text-center" />
                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <input
                              type="email"
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.email
                                }
                              )}
                              placeholder="Email Address"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email}
                              </div>
                            )}
                          </div>
                          {/* <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                /> */}

                          <div className="form-group">
                            <input
                              type="password"
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.password
                                }
                              )}
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChange}
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>

                          <input
                            type="submit"
                            className="btn btn-info btn-block mt-4"
                          />
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <MDBContainer>
          <MDBRow className="py-5">
            <MDBCol md="12" className="text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

//declare properties here  as a good react practice
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//here we are accessing our reducers from nicknames we assign to them using combine reducers
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//using connect to access reducers state and also our actions
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
