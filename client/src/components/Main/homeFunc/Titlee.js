import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editTitle } from "../../../actions/boardActions";
import Button from "@material-ui/core/Button";
import { toast } from 'react-toastify';

class Descriptionn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.title.length <= 2) {
      document.getElementById("errorr").innerHTML = "Minimum Length of title should be 2";
    } else {
      const { cardIDD } = this.props;
      this.props.editTitle(cardIDD, this.state.title);
      //toast
      toast.info('Title Updated');
      this.setState({ title: "" });
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

                  placeholder="Enter Title"
                  name="title"
                  value={this.state.title}
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
  editTitle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  cardIDD: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editTitle }
)(Descriptionn);
