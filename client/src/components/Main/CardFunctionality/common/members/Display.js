import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteMembers } from "../../../../../actions/modalActions";

class Display extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = e => {
    e.preventDefault();
    const { cardIDD, member } = this.props;
    console.log(cardIDD, member._id);
    this.props.deleteMembers(cardIDD, member._id);
  };

  render() {
    let content;
    const { member } = this.props;

    content = member.email;

    if (content) {
      return (
        <div style={{ marginTop: "-5px" }}>
          <h6>
            {content}
            <span>
              <Button onClick={this.handleDelete}>
                <FontAwesomeIcon
                  style={{ marginLeft: "5px" }}
                  icon={faTrashAlt}
                  size="sm"
                />
              </Button>
            </span>
          </h6>
        </div>
      );
    } else {
      return <div style={{ textAlign: "center" }} />;
    }
  }
}

Display.propTypes = {
  member: PropTypes.object.isRequired,
  cardIDD: PropTypes.string.isRequired,
  deleteMembers: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMembers }
)(Display);
