import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Display from "./Display";

class Members extends Component {
  render() {
    const { memberss, cardID } = this.props;

    return memberss.map(member => (
      <Display member={member} cardIDD={cardID} key={member._id} />
    ));
  }
}

Members.propTypes = {
  memberss: PropTypes.array.isRequired,
  cardID: PropTypes.string.isRequired
};

export default connect(null)(Members);
