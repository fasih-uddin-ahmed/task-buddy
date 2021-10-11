import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class NotificationItem extends Component {
    render() {
        let content;
        const { user, board } = this.props;
        content = (
            <div
                className="card card-body bg-light mb-2"
                style={{ height: "80px" }}
            >
                <div className="row">
                    <div className="col-md-12"
                        style={{ marginTop: "7px", marginLeft: "30px", color: "blue" }}
                    >
                        <span>
                            <Typography >
                                Hello!  You are added to board
                <span style={{ fontSize: "19px", marginLeft: "5px" }}>{board}</span> by
                <span style={{ fontSize: "19px", marginLeft: "5px" }}>
                                    {user}
                                </span>

                            </Typography>
                        </span>
                    </div>
                </div>
            </div>
        );

        if (content) {
            return content;
        } else {
            return <div style={{ textAlign: "center" }}>No More Notifications</div>;
        }
    }
}

NotificationItem.propTypes = {
    user: PropTypes.string.isRequired,
    board: PropTypes.string.isRequired
};

export default NotificationItem;
