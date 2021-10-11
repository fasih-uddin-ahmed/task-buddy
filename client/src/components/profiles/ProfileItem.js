import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
//import AddToBoard from "./AddToBoardDialog";
import BoardMembers from "./common/BoardMembers";
import AdminDelUser from "./common/AdminDelUser";

//we are also giving option of ((add to board)) button with each profile
//we are providing delete profile option only to admin
class ProfileItem extends Component {
  render() {
    let reqTeam;
    let content;
    const { profile, users, user } = this.props;
    //here we are getting the team of current user
    users.map(usr => {
      if (usr._id === user.id) {
        reqTeam = usr.team;
      }
    });
    console.log(reqTeam);
    //we will display all profiles for admin and for other users
    //we will filter those profiles onlyy whose users have the same team as current user
    users.map(usr => {
      // if admin
      if (user.id === "5d5cf44598ac050e18168bca") {
        content = (
          <div
            className="card card-body bg-light mb-3"
            style={{ marginTop: "30px" }}
          >
            <div className="row">
              <div className="col-2">
                <img
                  src={profile.user.avatar}
                  alt=""
                  className="rounded-circle"
                />
              </div>
              <div className="col-lg-6 col-md-4 col-8">
                <h3>{profile.user.name}</h3>
                <p>
                  {profile.status}{" "}
                  {isEmpty(profile.company) ? null : (
                    <span> at {profile.company} </span>
                  )}
                </p>
                <p>
                  {isEmpty(profile.location) ? null : (
                    <span>{profile.location}</span>
                  )}
                </p>
                <Link
                  to={`/profile/${profile.handle}`}
                  className="btn btn-info"
                >
                  View Profile
                </Link>
                <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                  <BoardMembers
                    name={profile.user.name}
                    avatar={profile.user.avatar}
                    idd={profile.user._id}
                  />
                </span>
                <AdminDelUser id={profile.user._id} />
              </div>
              <div className="col-md-4 d-none d-md-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="list-group-item">
                      <i className="fa fa-check pr-1" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
      //for other users
      else {
        if (usr._id === profile.user._id) {
          if (usr.team === reqTeam) {
            content = (
              <div
                className="card card-body bg-light mb-3"
                style={{ marginTop: "30px" }}
              >
                <div className="row">
                  <div className="col-2">
                    <img
                      src={profile.user.avatar}
                      alt=""
                      className="rounded-circle"
                    />
                  </div>
                  <div className="col-lg-6 col-md-4 col-8">
                    <h3>{profile.user.name}</h3>
                    <p>
                      {profile.status}{" "}
                      {isEmpty(profile.company) ? null : (
                        <span> at {profile.company} </span>
                      )}
                    </p>
                    <p>
                      {isEmpty(profile.location) ? null : (
                        <span>{profile.location}</span>
                      )}
                    </p>
                    <Link
                      to={`/profile/${profile.handle}`}
                      className="btn btn-info"
                    >
                      View Profile
                    </Link>
                    <span style={{ marginLeft: "5px" }}>
                      <BoardMembers
                        name={profile.user.name}
                        avatar={profile.user.avatar}
                        idd={profile.user._id}
                      />
                    </span>
                  </div>
                  <div className="col-md-4 d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                      {profile.skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="list-group-item">
                          <i className="fa fa-check pr-1" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          }
        }
      }
    });

    if (content) {
      return content;
    } else {
      return <div />;
    }

    //here we are setting the individual presentation of how each profile will display in profiles collection
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileItem;
