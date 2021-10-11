import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MembrItem from "./MembrItem";

class Membrs extends Component {
  render() {
    const { members, idd } = this.props.members;
    console.log(members, idd);

    return members.map(member => (
      <MembrItem
        key={member._id}
        name={member.name}
        avatar={member.avatar}
        userID={member.userID}
        boardID={idd}
      />
    ));
  }
}
Membrs.propTypes = {
  members: PropTypes.object.isRequired
};

export default connect(null)(Membrs);
