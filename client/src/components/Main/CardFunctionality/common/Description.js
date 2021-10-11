import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDescription } from "../../../../actions/modalActions";
import classnames from "classnames";
import Button from "@material-ui/core/Button";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.description.length < 8 || this.state.description.length > 200) {
      document.getElementById("errorr").innerHTML = "Description should be between 8 and 200 characters";
    } else {
      const { cardIDD } = this.props;
      this.props.addDescription(cardIDD, this.state.description);

      this.setState({ description: "" });
      this.props.onClose();
    }

  }

  render() {


    return (
      //<!-- Post Form -->

      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Description</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Create a Description"
                  name="description"
                  value={this.state.description}
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

Description.propTypes = {
  addDescription: PropTypes.func.isRequired,
  cardIDD: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};



export default connect(
  null,
  { addDescription }
)(Description);
