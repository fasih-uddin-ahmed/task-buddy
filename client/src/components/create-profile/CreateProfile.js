import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { createProfile } from "../../actions/profileActions";
/*
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
*/

//here we are creating profile
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio
    };
    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      // <!-- Create Profile -->
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.onSubmit}>
                {/* profile handle */}
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.handle
                    })}
                    placeholder="* Profile handle"
                    name="handle"
                    required
                    value={this.state.handle}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    A unique handle for your profile URL. Your full name,
                    company name, nickname.
                  </small>
                  {errors.handle && (
                    <div className="invalid-feedback">{errors.handle}</div>
                  )}
                </div>

                {/* status */}
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.status
                    })}
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>

                  {errors.status && (
                    <div className="invalid-feedback">{errors.status}</div>
                  )}
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>

                {/* company */}
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.company
                    })}
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Could be your own company or one you work for
                  </small>
                  {errors.company && (
                    <div className="invalid-feedback">{errors.company}</div>
                  )}
                </div>

                {/* location */}
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.location
                    })}
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    City & state suggested (eg. Boston, MA)
                  </small>
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>

                {/* skills */}
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.skills
                    })}
                    placeholder="Skills"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                  </small>
                  {errors.skills && (
                    <div className="invalid-feedback">{errors.skills}</div>
                  )}
                </div>

                {/* githubusername */}
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.githubusername
                    })}
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    If you want your latest repos and a Github link, include
                    your username
                  </small>
                  {errors.githubusername && (
                    <div className="invalid-feedback">
                      {errors.githubusername}
                    </div>
                  )}
                </div>

                {/* bio */}
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.bio
                    })}
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  />
                  {errors.bio && (
                    <div className="invalid-feedback">{errors.bio}</div>
                  )}
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
