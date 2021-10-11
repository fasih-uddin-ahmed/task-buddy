import React, { Component } from "react";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { getChecklists } from "../../../../../actions/modalActions";
//import Button from "@material-ui/core/Button";
//import { faListAlt } from "@fortawesome/free-regular-svg-icons";
let content;
class CheckboxApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: true
    };
  }
  componentDidMount = () => {
    const { chklistt } = this.props;
    
    chklistt.map(listt => {
      if (listt.status === "checked") {
        this.selectedCheckboxes.add(listt.name);
      }
    });
  };
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  createCheckboxes = () => {
    const { cardID, chklistt } = this.props;
    content = chklistt.map(listt => (
      <Checkbox
        label={listt.name}
        handleCheckboxChange={this.toggleCheckbox}
        key={listt._id}
        status={listt.status}
        idd={listt._id}
        cardsID={cardID}
      />
    ));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              {content}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CheckboxApp.propTypes = {
  cardID: PropTypes.string.isRequired,
  chklistt: PropTypes.array.isRequired
};

export default connect(null)(CheckboxApp);
