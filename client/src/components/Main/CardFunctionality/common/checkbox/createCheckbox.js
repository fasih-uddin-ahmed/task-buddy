import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addChecklist } from "../../../../../actions/modalActions";
import classnames from "classnames";
import Button from "@material-ui/core/Button";

class createCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checklist: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.checklist.length <= 3 ) {
      document.getElementById("errorr").innerHTML = "Checklist's title minimum length should be 4";
    }else{
     
    const { cardIDD } = this.props;
    this.props.addChecklist(cardIDD, this.state.checklist);

    this.setState({ checklist: "" });
    this.props.onClose(); 
    }
  }

  render() {

    return (
      //<!-- Post Form -->

      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white" />
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className= "form-control form-control-lg"
                  placeholder="Create a Checklist"
                  name="checklist"
                  value={this.state.checklist}
                  onChange={this.onChange}
                />
           <font color="red"><span id="errorr"></span></font>
              </div>
              <Button onClick={this.onSubmit} color="primary">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

createCheckbox.propTypes = {
  addChecklist: PropTypes.func.isRequired,
  cardIDD: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};



export default connect(
  null,
  { addChecklist }
)(createCheckbox);
