import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RequestItem from "./RequestItem";

class Requests extends Component {
  render() {
    const { user } = this.props.auth;
    const { users } = this.props;
    let reqUser;

    users.users.map(usr => {
      console.log(usr._id, user.id);
      if (usr._id === user.id) {
        reqUser = usr;
      }
    });

    return reqUser.receiveReq.map(reqq => (
      <RequestItem
        key={reqq._id}
        email={reqq.email}
        avatar={reqq.avatar}
        team={reqq.team}
        idd={user.id}
        show={reqq.hidden}
      />
    ));
  }
}
Requests.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Requests);
