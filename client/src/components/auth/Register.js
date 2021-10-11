import React, { Component } from "react";
//for getting access to props.history for redirecting or routing
import { withRouter } from "react-router-dom";
//importing classnames for accessing classes for displaying errors
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
//we are importing this file to make our input fields work cleanly and easy to view
// import TextFieldGroup from "../common/TextFieldGroup";
import { registerUser } from "../../actions/authActions";
import { MDBAnimation } from "mdbreact";
// import UploadFiles from '../common/uploadFiles';

import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import "./index.css";
// import { toast } from 'react-toastify';
// const styles = {
//   progress: {
//     position: "absolute"
//   }
// };


class Register extends Component {
  //gonna make component state
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //we are checking if someone tries to access register page when he is login...then we will not allow him
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //here we are receiving errors as a props from reducers and then converting them to state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // handleImageStatus = image => {
  //   let profileImage = this.state.image;
  //   profileImage = image;
  //   this.setState({ imageStatus: true, profileImage });
  // }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // console.log(this.state.image);
    //we are calling action for registering user and passing props.history for redirecting
    this.props.registerUser(newUser, this.props.history);
    // toast.success('Successfully registered');
  }

  render() {
    const { errors } = this.state;

    return (
      // <!-- Register -->
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
                    Sign up to your TaskBuddy Account!
                  </h1>
                  <hr className="hr-light" color="white" />
                  <h6 className="mb-4">
                  Trello’s boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
                  </h6>
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
                          <MDBIcon icon="user" /> Register:
                        </h3>
                        <hr className="hr-light" color="white" />
                        <form noValidate onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <input
                              type="text"
                              style={{ height: "45px" }}
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.name
                                }
                              )}
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              style={{ height: "45px" }}
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
                          <div className="form-group">
                            <input
                              type="password"
                              style={{ height: "45px" }}
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
                          <div className="form-group">
                            <input
                              type="password"
                              style={{ height: "45px" }}
                              className={classnames(
                                "form-control form-control-lg",
                                {
                                  "is-invalid": errors.password2
                                }
                              )}
                              placeholder="Confirm Password"
                              name="password2"
                              value={this.state.password2}
                              onChange={this.onChange}
                            />
                            {errors.password2 && (
                              <div className="invalid-feedback">
                                {errors.password2}
                              </div>
                            )}
                          </div>
                          {/* < UploadFiles
                            filesLength={1}
                            fileSize={2.5}
                            filesType={[
                              "image/png",
                              "image/jpeg",
                              "image/jpg"
                            ]}
                            url="uploadImages"
                            omImageStatus={this.handleImageStatus}
                          >
                            image
                          </ UploadFiles> */}


                          <input
                            type="submit"
                            // className="btn bg-transparent btn-lg  btn-info mt-2 mr-2"
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
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { registerUser }
)(withRouter(Register));
