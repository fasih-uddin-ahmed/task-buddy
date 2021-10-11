import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { acceptRequest, rejectRequest } from "../../../actions/teamActions";

class RequestItem extends Component {
  constructor(props) {
    super(props);

    this.onAcceptSubmit = this.onAcceptSubmit.bind(this);
    this.onRejectSubmit = this.onRejectSubmit.bind(this);
  }
  onAcceptSubmit(e) {
    e.preventDefault();

    const { email, team, idd } = this.props;
    console.log("inside onsubmit of accept Request");
    console.log(email, team, idd);
    this.props.acceptRequest(email, team, idd);
  }

  onRejectSubmit(e) {
    e.preventDefault();

    const { email, idd } = this.props;
    console.log("inside onsubmit of reject Request");
    console.log(email, idd);
    this.props.rejectRequest(email, idd);
  }

  render() {
    let content;
    const { avatar, team, email, show } = this.props;
    if (!show) {
      content = (
        <div
          className="card card-body bg-light mb-2"
          style={{ height: "85px" }}
        >
          <div className="row"
          >
            <div className="col-md-2 "
              style={{ marginTop: "-5px" }}
            >
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={avatar}
                  alt=""
                />
              </a>
            </div>
            <span >
              <Typography >
                {email} has invited you to join his team {team}.
              </Typography>
            </span>
            <span style={{ marginLeft: "400px", marginTop: "-23px" }}>
              <Button onClick={this.onAcceptSubmit} color="primary">
                Accept
              </Button>
              <Button onClick={this.onRejectSubmit} color="primary">
                Reject
              </Button>
            </span>
          </div>
        </div>
      );
    }

    if (content) {
      return content;
    } else {
      return <div style={{ textAlign: "center" }}>No Requests</div>;
    }
  }
}

RequestItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  idd: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired
};

export default connect(
  null,
  { acceptRequest, rejectRequest }
)(RequestItem);
