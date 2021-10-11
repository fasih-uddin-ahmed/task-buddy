import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

class Notifications extends Component {
    render() {
        console.log(this.props.notii);
        return this.props.notii.noti.map(n => (
            <NotificationItem
                key={n._id}
                user={n.userName}
                board={n.boardName}
            />
        ));
    }
}
Notifications.propTypes = {
    notii: PropTypes.object.isRequired
};


export default connect(null)(Notifications);
