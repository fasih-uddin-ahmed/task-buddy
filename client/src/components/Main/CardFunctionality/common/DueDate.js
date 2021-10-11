import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDueDate } from "../../../../actions/modalActions";
import Button from "@material-ui/core/Button";

class DueDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let today = new Date();
    //let date_from = document.getElementById("dueDate").value;
    let date_from = this.state.dueDate;
    date_from = new Date(date_from)

    if (today > date_from) {
      document.getElementById("errorr").innerHTML = "You cannot select the days before.";
    }
    else {

      this.props.addDueDate(this.props.cardID, this.state.dueDate);
      this.setState({ dueDate: "" });
      this.props.onClose();
    }
  }

  render() {
    return (
      //<!-- Post Form -->
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Due Date</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  id="dueDate"
                  type="date"
                  classnames="form-control form-control-lg"
                  placeholder="due Date"
                  name="dueDate"
                  value={this.state.dueDate}
                  onChange={this.onChange}
                  required
                />
                <br />
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

DueDate.propTypes = {
  addDueDate: PropTypes.func.isRequired,
  cardID: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default connect(
  null,
  { addDueDate }
)(DueDate);
