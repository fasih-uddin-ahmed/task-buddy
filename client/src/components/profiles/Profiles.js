import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";
import { getUsers } from "../../actions/teamActions";
import Invitation from "./invitationDialog";
import Requests from "./RequestsDialog";
import RequestsSent from "./RequestsSentDialog";

//here in this component we are getting all profiles through (getProfiles) action and displaying each profile separately through((ProfileItem Component))
//we are also providing (request Sending,accept,reject and sent requests results viewing through>>>>>(((dialogs and common components comboooo))) )

class Profiles extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProfiles();
  }

  render() {
    const { user } = this.props.auth;
    const { users } = this.props.team;
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem
            key={profile._id}
            profile={profile}
            users={users}
            user={user}
          />
        ));
      } else {
        profileItems = <h4> No profiles found... </h4>;
      }
    }
    console.log(users);
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> Team members profiles</h1>
              <p className="lead text-center">
                Browse and connect with team members
              </p>
              <span style={{ marginLeft: "70px" }}>
                <Invitation />
              </span>
              <span style={{ marginLeft: "100px" }}>
                <Requests users={users} />
              </span>
              <span style={{ marginLeft: "100px" }}>
                <RequestsSent users={users} />
              </span>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  team: state.team,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles, getUsers }
)(Profiles);
