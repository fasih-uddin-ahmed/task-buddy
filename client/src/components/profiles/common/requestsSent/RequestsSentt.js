import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RequestsSentItem from "./RequestsSentItem";

class RequestsSentt extends Component {
  render() {
    const { user } = this.props.auth;
    const { users } = this.props;
    let reqUser;

    users.users.map(usr => {
      if (usr._id === user.id) {
        reqUser = usr;
      }
    });
    console.log(reqUser.email);

    return reqUser.sendReq.map(reqq => (
      <RequestsSentItem
        key={reqq._id}
        email={reqq.email}
        avatar={reqq.avatar}
        status={reqq.status}
      />
    ));
  }
}
RequestsSentt.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RequestsSentt);
