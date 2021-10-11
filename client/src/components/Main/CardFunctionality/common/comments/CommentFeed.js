import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, cardId } = this.props;

    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        commentAuth={comment.user_id}
        comment={comment}
        cardId={cardId}
      />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  cardId: PropTypes.string.isRequired
};

export default CommentFeed;
