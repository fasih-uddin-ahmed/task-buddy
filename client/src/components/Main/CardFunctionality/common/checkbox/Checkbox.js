import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  changeStatus,
  deleteChecklist
} from "../../../../../actions/modalActions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Checkbox extends Component {
  state = {
    isChecked: this.props.status
  };

  handleDelete(cardsID, idd) {
    console.log(cardsID);
    this.props.deleteChecklist(cardsID, idd);
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label, idd, cardsID } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));
    console.log(!this.state.isChecked);
    this.props.changeStatus(cardsID, !this.state.isChecked, idd);

    handleCheckboxChange(label);
  };

  render() {
    const { cardsID, idd } = this.props;
    const { label } = this.props;
    const { isChecked } = this.state;
    console.log("now rendering checkbox and label is");
    console.log(label);
    return (
      <div className="checkbox">
        <span>
          <label>
            <input
              type="checkbox"
              value={label}
              checked={isChecked}
              onChange={this.toggleCheckboxChange}
            />

            {label}
          </label>
        </span>
        {/* icon button for deleting checklist   ...................................................................*/}
        <span
          style={{
            marginleft: "30px"
          }}
        >
          <Button onClick={this.handleDelete.bind(this, cardsID, idd)}>
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faTrashAlt}
              size="sm"
            />
          </Button>
        </span>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  idd: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteChecklist: PropTypes.func.isRequired,
  cardsID: PropTypes.string.isRequired
};

export default connect(
  null,
  { changeStatus, deleteChecklist }
)(Checkbox);
