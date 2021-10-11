import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import Typography from "@material-ui/core/Typography";
import { getBoards, deleteBoard } from "../../actions/boardActions";
import BoardThumbnail from "./BoardThumbnail";
import PropTypes from "prop-types";
import { addBoard } from "../../actions/boardActions";
import { createTeam, getUsers } from "../../actions/teamActions";
import Button from "@material-ui/core/Button";
import DescriptionDialog from "./homeFunc/descDialog";
import TitleDialog from "./homeFunc/titleDialog";
import classnames from 'classnames';
import MembrsDialog from "./homeFunc/MembrsDialog";
import "./sidenav css/sideNav.css";
import IntrooCard from './homeFunc/card/IntrooCard';
import {
  MDBCard,
  MDBContainer,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdbreact";
import { toast } from 'react-toastify';
import AddToBoardDialog from './homeFunc/AddToBoardDialog';


const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margintop: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
`;

class Home extends Component {
  // this is the home site that shows you your boards and you can also create a Board here.We are displaying boards as thumbnail with <BoardThumbnail> component
  //and then you will be moved to the board u will select(through actionlistener on boardthumbnail).
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      teamName: "",
      description: "",
      editTitle: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTeamSubmit = this.onTeamSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getBoards();
  }
  //here we are receiving errors as a props from reducers and then converting them to state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //fpor creating board and calling addboard action
  onSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    this.props.addBoard(title);
    toast.info('board created Successfully');
    this.setState({ title: "" });
  }
  //for creating team and calling addTeam action
  onTeamSubmit(e) {
    e.preventDefault();
    const { teamName } = this.state;
    this.props.createTeam(teamName);
    toast.info('team created Successfully');
    this.setState({ teamName: "" });
  }

  handleDelete(id, idd) {
    const { user } = this.props.auth;
    console.log(id);
    this.props.deleteBoard(id);
    toast.info('Board deleted');
  }

  //here we are optionally displaying boards....(for admin) we are displaying all boards and for (other users) we will display only those boards whose members they are..
  //we are displaying board through calling (Board Thumbnail Component)for better interface...
  renderBoards = () => {
    const { boards } = this.props.boards;
    const { user } = this.props.auth;
    console.log(user);
    //in component return we are displaying a large thumbnail and displaying delete board, edit title and description
    //options and also checking and deleting members of board...((and these options working is carried through the separate
    // separate components and dialogs for easy management>>>>>>>>>>>and these dialogs and components are in ((homefunc (folderr)))))..
    return boards.map(board => {
      let content;
      const idd = board.user_id;
      console.log(idd);
      if (user.id === "5d5cf44598ac050e18168bca" || user.id === idd) {
        return (
          <div className="something">
            <Link
              key={board._id}
              //to={`/${board.id}`}now we are passing boards too through state in link
              to={{
                pathname: `/board/${board._id}`,
                state: { boardd: board }
              }}
              style={{ textDecoration: "none" }}
            >
              <BoardThumbnail
                title={board.title}
                description={board.description}
                members={board.members}
                id={board._id}
              />
            </Link>
            <div
              style={{
                flexDirection: "horizontal",
                marginLeft: "20px",
                marginTop: "24px"
              }}
            >
              <AddToBoardDialog boardID={board._id} />
              <MembrsDialog members={board.members} idd={board._id} />
              <Button
                style={{ marginLeft: "5px" }}
                onClick={this.handleDelete.bind(this, board._id, board.user_id)}
                variant="contained"
                size="small"
                color="secondary"
              >
                Delete
              </Button>

              <span style={{ marginLeft: "220px" }}>
                <TitleDialog idd={board._id} />
                <DescriptionDialog idd={board._id} />
              </span>
            </div>
          </div>
        );
      } else {
        board.members.map(mmbr => {
          if (mmbr.userID === user.id) {
            console.log(mmbr.userID, user.id);
            content = (
              <div className="something">
                <Link
                  key={board._id}
                  //to={`/${board.id}`}now we are passing boards too through state in link
                  to={{
                    pathname: `/board/${board._id}`,
                    state: { boardd: board }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <BoardThumbnail
                    title={board.title}
                    description={board.description}
                    members={board.members}
                    id={board._id}
                  />
                </Link>
                <div
                  style={{
                    flexDirection: "horizontal",
                    marginLeft: "20px",
                    marginTop: "18px"
                  }}
                >
                  <MembrsDialog members={board.members} idd={board._id} />
                </div>
              </div>
            );
          }
        });
        if (content) {
          return content;
        } else {
          return;
        }
      }
    });
  };
  //form for creating board
  renderCreateBoard() {
    const { errors } = this.state;
    const { title } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        style={{
          marginTop: "-100px",
          marginBottom: "-10px",
          textAlign: "center"
        }}
      >
        <div className="form-group">
          <textarea
            style={{ height: "39px", width: "240px" }}
            className={classnames(
              "form-control form-control-lg",
              {
                "is-invalid": errors.title
              }
            )}
            placeholder="Enter board title"
            name="title"
            value={title}
            onChange={this.onChange}
          />
          {errors.title && (
            <div className="invalid-feedback">
              {errors.title}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-dark"
        >
          Submit
        </button>
      </form>
    );
  }

  //form for creating team
  renderCreateTeam() {
    const { teamName } = this.state;
    return (
      <form
        onSubmit={this.onTeamSubmit}
        style={{ textAlign: "center", marginTop: "-230px" }}
      >
        <div className="form-group">
          <textarea
            style={{ height: "39px", width: "240px" }}
            className="form-control form-control-lg"
            placeholder="Enter team name"
            name="teamName"
            value={teamName}
            onChange={this.onChange}
          />

        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="thumbnail">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="navbar navbar-inverse navbar-fixed-left">
                {/* <Typography
                  style={{
                    marginTop: "-100px",
                    fontSize: "20px",
                    marginLeft: "30px"
                  }}
                >
                  {/* <i>Create Your board</i> */}

                {this.renderCreateBoard()}
                {/* <Typography
                  style={{
                    marginTop: "-250px",
                    fontSize: "20px",
                    marginLeft: "30px",
                    marginBottom: "-200px"
                  }}
                >
                  <i> Create Your team</i>
                </Typography> */}
                {this.renderCreateTeam()}
              </div>
              {/* <div style={{ borderRight: "2px solid black" }}>
                
              </div> */}
            </div>

            <div className="col-md-6 mr-1">
              <span style={{ width: "800px", marginRight: "-200px" }}>
                <IntrooCard />
              </span>
              <HomeContainer>
                <Thumbnails>{this.renderBoards()}</Thumbnails>
              </HomeContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  boards: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getBoards: PropTypes.func.isRequired,
  addBoard: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boards: state.boards,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBoards, addBoard, createTeam, getUsers, deleteBoard }
)(Home);
