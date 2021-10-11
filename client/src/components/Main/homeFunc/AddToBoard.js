import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMemberr } from "../../../actions/boardActions";
import Button from "@material-ui/core/Button";

class AddToBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onHandleSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const { bordID } = this.props;
    //console.log(user);
    this.props.addMemberr(bordID.boardID, this.state.email, user.name);
    this.setState({ email: "" });
    this.props.onClose();
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Description</div>
          <div className="card-body">
            <form onSubmit={this.onHandleSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <Button onClick={this.onHandleSubmit} color="primary">
                Submit
            </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddToBoard.propTypes = {
  bordID: PropTypes.object.isRequired,
  addMemberr: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  activeBoard: state.activeBoard,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addMemberr }
)(AddToBoard);
