import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMember } from "../../../actions/boardActions";

class BoardMembers extends Component {
  constructor(props) {
    super(props);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  onHandleSubmit(e) {
    e.preventDefault();
    const { name, avatar, idd, activeBoard } = this.props;
    console.log("inside onsubmit of add Member");
    console.log(activeBoard.id, name, avatar, idd);
    this.props.addMember(activeBoard.id, name, avatar, idd);
  }

  render() {
    return (
      <button className="btn btn-info" onClick={this.onHandleSubmit}>
        Add To Board
      </button>
    );
  }
}

BoardMembers.propTypes = {
  activeBoard: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  idd: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  activeBoard: state.activeBoard
});

export default connect(
  mapStateToProps,
  { addMember }
)(BoardMembers);
