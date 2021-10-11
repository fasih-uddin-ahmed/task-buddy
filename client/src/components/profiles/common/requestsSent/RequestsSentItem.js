import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class RequestsSentItem extends Component {
  render() {
    let content;
    const { avatar, email, status } = this.props;
    content = (
      <div
        className="card card-body bg-light mb-2"
        style={{ height: "80px" }}
      >
        <div className="row">
          <div className="col-md-2"
            style={{ marginTop: "-10px", height: "50px" }}>
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={avatar}
                alt=""
              />
            </a>
          </div>

          <div className="col-md-10"
            style={{ marginTop: "7px" }}
          >
            <span>
              <Typography >
                Your invitation to{" "}
                <span style={{ fontSize: "16px" }}>{email}</span> is{" "}
                <span style={{ fontSize: "16px", color: "#5760da" }}>
                  <u>{status}</u>
                </span>

              </Typography>
            </span>
          </div>
        </div>
      </div>
    );

    if (content) {
      return content;
    } else {
      return <div style={{ textAlign: "center" }}>No More Invitations</div>;
    }
  }
}

RequestsSentItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default RequestsSentItem;
