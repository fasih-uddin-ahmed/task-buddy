import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { addMembers } from "../../../../../../actions/modalActions";

class MembersItem extends Component {

    onAddMember(e) {
        e.preventDefault();
        
        const { cardIDD, userID } = this.props;
        let mail;
        //we are applying map on users to get the email of members coming from board
    this.props.users.map(user=> {
        if(user._id === userID ){
             mail = user.email
        }
      })

      //now we will call Add Members
    this.props.addMembers(cardIDD, userID, mail);
    }
    render() {
        let content;
        
        const { avatar, name } = this.props;
        content = (
            <div
                className="card card-body bg-light mb-3"
                style={{ marginTop: "5px", marginBottom: "-5px" }}
            >
                <div className="row">
                    <div className="col-md-2 ">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block"
                                src={avatar}
                                alt=""
                            />
                        </a>
                    </div>

                    <div className="col-md-10">
                        <span>
                            <Typography >
                                Add{" "}
                                <span style={{ fontSize: "16px" }}>{name}</span> is{" "}
                                to this card-->
              </Typography>
                            <Button onClick={this.onAddMember.bind(this)} color="primary">
                            Done
          </Button>

                        </span>
                    </div>
                </div>
            </div>
        );

        if (content) {
            return content;
        } else {
            return <div style={{ textAlign: "center" }}>No More Left</div>;
        }
    }
}

MembersItem.propTypes = {
    addMembers: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    cardIDD: PropTypes.string.isRequired
};

export default connect(null, { addMembers })(MembersItem);
