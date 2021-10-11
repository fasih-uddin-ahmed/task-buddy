import React, { Component } from "react";
import { getComments } from "../../../../../actions/modalActions";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentFeed from "./CommentFeed";

class ModalComments extends Component {
  componentDidMount() {
    const { cardID } = this.props.match.params;
    this.props.getComments(cardID);
  }

  handleComments = () => {};
  render() {
    const { comments } = this.props.modal;
    const { cardID } = this.props.match.params;

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <CommentForm cardId={cardID} />
              <CommentFeed cardId={cardID} comments={comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalComments.propTypes = {
  modal: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { getComments }
)(ModalComments);
