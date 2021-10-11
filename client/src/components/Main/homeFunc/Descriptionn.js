import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editDescription } from "../../../actions/boardActions";
import Button from "@material-ui/core/Button";
import { toast } from 'react-toastify';

class Descriptionn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  //toast
  // update = () => toast.update({ type: toast.TYPE.INFO, autoClose: 5000 });

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.description.length < 8 || this.state.description.length > 200) {
      document.getElementById("errorr").innerHTML = "Length of Description should be between 8 and 200.";
    } else {
      const { cardIDD } = this.props;
      this.props.editDescription(cardIDD, this.state.description);
      //toast
      toast.info('Description Updated');
      this.setState({ description: "" });
      this.props.onClose();
    }

  }

  render() {
    const { errors } = this.state;

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

Descriptionn.propTypes = {
  editDescription: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  cardIDD: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editDescription }
)(Descriptionn);
