import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //Get First name
    const firstName = profile.user.name.trim().split(" ")[0];
    //skills list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      // <!-- Profile About -->
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span> {firstName} does not hav a bio </span>
              ) : (
                <span>at {profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
            <h3 className="text-center text-info">{firstName}'s Github</h3>
            <p className="lead">
              {isEmpty(profile.githubusername) ? (
                <span> {firstName} does not hav a Github Account </span>
              ) : (
                <span>at {profile.githubusername}</span>
              )}
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
