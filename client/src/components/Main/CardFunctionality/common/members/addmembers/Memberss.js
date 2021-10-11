import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMembers } from "../../../../../../actions/modalActions";
import { getUsers } from "../../../../../../actions/teamActions";
import MembersItem from "./MembersItem";
class Memberss extends Component {

  componentDidMount() {
    this.props.getUsers();
  }


  //here we are getting board members and passing them to(memberItem component) for rendering and will add members  from these to card members
  render() {
    const { users } = this.props.team;
    const { crdID } = this.props;
    if (crdID.memberss.length > 0) {
      return crdID.memberss.map(item => (
        <MembersItem
          key={item._id}
          userID={item.userID}
          avatar={item.avatar}
          name={item.name}
          users={users}
          cardIDD={crdID.idd}
        />
      ));
    } else {
      return (
        <div>No more memberss </div>
      )
    }

  }
}

Memberss.propTypes = {

  mmbrs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  crdID: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  team: state.team
});

export default connect(
  mapStateToProps,
  { addMembers, getUsers }
)(Memberss);
