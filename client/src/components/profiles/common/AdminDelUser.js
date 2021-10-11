import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { adminDeleteAccount } from "../../../actions/profileActions";

class AdminDelUser extends Component {
  onDeleteClick(e) {
    e.preventDefault();
    const { id } = this.props;
    console.log("inside delete  user");
    this.props.adminDeleteAccount(id);
  }

  render() {
    return (
      <button
        onClick={this.onDeleteClick.bind(this)}
        className="btn btn-danger"
      >
        Delete
      </button>
    );
  }
}

AdminDelUser.propTypes = {
  adminDeleteAccount: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default connect(
  null,
  { adminDeleteAccount }
)(AdminDelUser);
