import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendRequest } from "../../../actions/teamActions";
import classnames from "classnames";
import Button from "@material-ui/core/Button";

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    console.log("inside onsubmit of send Request");
    console.log(this.state.email, user.id);
    this.props.sendRequest(this.state.email, user.id);
    this.setState({ email: "" });

    this.props.onClose();
  }

  render() {
    const { errors } = this.state;
    return (
      //<!-- Post Form -->
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Description</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <Button onClick={this.onSubmit} color="primary">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Invitation.propTypes = {
  auth: PropTypes.object.isRequired,
  sendRequest: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { sendRequest }
)(Invitation);
