import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getModals, initModal } from "../../../../actions/modalActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faTasks,
  faComment,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import Button from "@material-ui/core/Button";
import DescriptionDialog from "../Dialogs/Description";
import DueDateDialog from "../Dialogs/DueDate";
import Checklist from "../Dialogs/Checklist";
import Createe from "../Dialogs/createMembr";
import MembersData from "../common/members/Members";
import CheckboxApp from "../common/checkbox/CheckboxApp";

//we are opening thus component inside model and we are managing whole model through this base component
//using combo of (dialogs and common components) for performing each functionality......
//here we are rendering modal data on (renderData Button((onClick Property ))) because of some unnecessary component rerendering(dont know why just stuck)......

class CardSetting extends Component {

  //getting modals and initializing for new updates
  componentDidMount() {
    const { card, modals } = this.props;

    this.props.getModals();
    this.props.initModal(card._id, card.user_id);
  }

  render() {

    //creating variables for getting values of card modal 
    let chklistt = [];
    let mmbrs = [];
    let date = "";
    let desc = "";
    const { card, title } = this.props;
    const { modals } = this.props.modal;

    //using map for getting the required card data
    //and first checking if the component is not updated then  not updating it
    //and only when putting values when they exists meand length > 0  for arrays 
    modals.map(modal => {
      if (modal.card_id === card._id) {
        if (modal.dueDate) {
          date = modal.dueDate;
        }
        if (modal.description) {
          desc = modal.description;
        }
        if (modal.checklist.length > 0) {
          modal.checklist.map(chk => {
            let st = true;
            chklistt.map(c => {
              if (c.name === chk.name) {
                st = false;
              }
            })
            if (st) {
              chklistt.unshift(chk);
            }

          });
        }
        if (modal.members.length > 0) {
          modal.members.map(m => {
            mmbrs.unshift(m);
          });
        }
      }
    });

    return (


      <div className="container">
        <div style={{
          backgroundColor: "#31292980", alignItems: "center", justifyContent: "center",
          width: "501px", height: "50px", marginTop: "-28px", marginLeft: "-32px"
        }}> <h4 style={{ marginLeft: "95px", paddingTop: "10px" }}> Manage Your Card Settings </h4>  </div>
        <div className="row">
          <div className="col-md-8">
            {/* //card name and list name */}
            <div>
              <h6 style={{ marginTop: "10px" }}>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faAddressCard} size="sm" />
                </span>
                <span style={{ marginLeft: "8px" }}>{card.text}</span>
              </h6>

              <Typography style={{ paddingLeft: "35px", fontSize: "13px" }}>
                in list{" "}
                <span style={{ textDecorationLine: "underline" }}>{title}</span>{" "}
              </Typography>
            </div>
            {/* description about card ......................................................*/}
            <div style={{ paddingTop: "40px" }}>
              <h6>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faBars} size="sm" />
                </span>
                <span style={{ marginLeft: "8px" }}>Description</span>
              </h6>
              <Typography
                style={{
                  height: "80px",
                  background: "#e6ebe7",
                  fontSize: "13px",
                  textAlign: "left",
                  fontWeight: "fontWeightMedium",
                  fontFamily: "Monospace"
                }}
              >
                {desc}
              </Typography>
            </div>
            {/* checklists and progress ..........................................................*/}
            <div style={{ paddingTop: "20px" }}>
              <h6>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faTasks} size="sm" />
                </span>
                <span style={{ marginLeft: "8px" }}>Checklist</span>
              </h6>
              <div className="progress">
                <div
                  id="dynamic"
                  className="progress-bar progress-bar-success progress-bar-striped active"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "0%" }}
                >
                  <span id="current-progress" />
                </div>
              </div>{" "}
              {/* condition for checkbox ........................................................*/}
              {chklistt.length > 0 ? (
                <CheckboxApp cardID={card._id} chklistt={chklistt} />
              ) : null}{" "}
            </div>

            {/* due date ..........................................................................*/}
            <div style={{ paddingTop: "40px" }}>
              <h6>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faClock} size="sm" />
                </span>
                <span style={{ marginLeft: "8px" }}>Due Date</span>
              </h6>
              <Typography
                style={{
                  paddingLeft: "35px",
                  height: "20px"
                }}
              >
                {date}
              </Typography>
            </div>

            {/* Members ..........................................................................*/}
            <div>
              <h6>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faClock} size="sm" />
                </span>
                <span style={{ marginLeft: "8px" }}>Members</span>
              </h6>
              <div
                style={{
                  marginTop: "3px",
                  paddingLeft: "10px"
                }}
              >
                {/* condition for members */}
                {mmbrs.length > 0 ? (
                  <MembersData memberss={mmbrs} cardID={card._id} />
                ) : null}{" "}
              </div>
            </div>
          </div>
          {/* Add to card buttons right side .......................................................*/}
          <div className="col-md-4 ">
            <div
              style={{
                width: "100%",
                marginTop: "40px",
                background: "#e6ebe7"
              }}
            >
              <Button disabled>Add to card</Button>
            </div>
            {/* for adding members   ...................................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <Createe idd={card._id} memberss={this.props.members} />
            </div>
            {/* for adding discription .............................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <DescriptionDialog idd={card._id} />
            </div>
            {/* for adding duedate ...............................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <DueDateDialog idd={card._id} />
            </div>
            {/* for adding checklists ..........................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <Checklist idd={card._id} />
            </div>
            {/* for adding attachments .........................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <Button>
                <span style={{ marginRight: "5px" }}>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faPaperclip}
                    size="sm"
                  />
                </span>
                Attachment
              </Button>
            </div>
            {/* for adding and viewing comments .........................................................*/}
            <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <Link
                key={card._id}
                //to={`/${board.id}`}now we are passing boards too through state in link
                to={`/card/${card._id}`}
                // to={{
                //   pathname: `/card/${card._id}`,
                //   state: { commentss: this.state.comments }
                // }}
                style={{ textDecoration: "none" }}
              >
                <Button>
                  <span style={{ marginRight: "5px" }}>
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faComment}
                      size="sm"
                    />
                  </span>
                  Comments
                </Button>
              </Link>
            </div>

            {/* for updating modal and data rendering   ...................................................................*/}
            {/*} <div
              style={{
                width: "100%",
                marginTop: "15px",
                background: "#e6ebe7"
              }}
            >
              <Button onClick={this.handleSubmit}>
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faUser}
                  size="sm"
                />
                Render Data
              </Button>
            </div> */}
          </div>
        </div>
        {/* {this.props.getModals()} */}
      </div >
    );
  }
}

CardSetting.propTypes = {
  getModals: PropTypes.func.isRequired,
  initModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getModals, initModal }
)(CardSetting);
