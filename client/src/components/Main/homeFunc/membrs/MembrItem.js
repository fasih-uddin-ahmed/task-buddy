import React, { Component } from "react";
import PropTypes from "prop-types";
//import Typography from "@material-ui/core/Typography";
import { deleteMember } from "../../../../actions/boardActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { toast } from 'react-toastify';

class MembrItem extends Component {
  handleDelete = (userID, boardID) => {
    console.log(userID, boardID);

    this.props.deleteMember(boardID, userID);
  };

  render() {
    let content;
    const { avatar, name, userID, boardID } = this.props;
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

          <div className="col-md 10"
          >
            <h5>{name}
              <span style={{ marginLeft: "30px" }}>
                <Button
                  color="primary"
                  onClick={this.handleDelete.bind(this, userID, boardID)}
                >
                  <FontAwesomeIcon
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    icon={faTrashAlt}
                    size="sm"
                  />
                  Remove This Member
              </Button>
              </span>
            </h5>


          </div>
        </div>
      </div>
    );

    if (content) {
      return content;
    } else {
      return <div style={{ textAlign: "center" }}>No More Members</div>;
    }
  }
}

MembrItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  boardID: PropTypes.string.isRequired,
  deleteMember: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMember }
)(MembrItem);
