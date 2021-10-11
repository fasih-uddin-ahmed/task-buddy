import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/teamActions"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//importing cards
import BoardsCard from './cards/BoardsCard';
import NotificationsCard from './cards/NotificationsCard';
import ListCard from './cards/ListCard';
import CardIntro from './cards/CardIntro';
import PrivacyIntro from './cards/PrivacyIntro';


//here we are getting option for deleting current profile and if not created profile then asking for creating one..
//from here we will go to our boards...means(Home component)
class Dashboard extends Component {
  //
  //
  //we are getting profile of current user in our state
  componentDidMount() {
    this.props.getUsers();
    this.props.getCurrentProfile();
  }
  //
  //
  //here we are deleting profile and account of current user
  onDeleteClick() {
    this.props.deleteAccount();
  }

  //
  //
  render() {
    const { users } = this.props.team;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    //here we are getting the notifications of current user and sending it to notifications display dialogue
    let notification = [];
    users.map(usr => {
      if (usr._id === user.id) {
        usr.notification.map(noti => {
          notification.unshift(noti);
        })
      }
    })

    let dashboardContent;
    //
    //
    //
    //
    //here we are setting dashboard content for profile handling .......
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data.........if user dont have profile data than we will ask him to make profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Link
              to="/edit-profile"
              className="btn btn-light"
              style={{
                width: "140px",
                height: "40px",
                paddingBottom: "7px",
                paddingTop: "-4px",
                fontSize: "17px",
                marginRight: "8px",
                marginLeft: "25px"
              }}
            >
              Edit Profile
            </Link>
            <span>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
                style={{
                  width: "140px",
                  height: "40px",
                  paddingBottom: "7px",
                  paddingTop: "7px",
                  fontSize: "17px"
                }}
              >
                Delete Account
              </button>
            </span>
          </div>
        );
      } else {
        dashboardContent = (
          <Link
            to="/create-profile"
            className="btn btn-lg btn-info"
            style={{
              width: "140px",
              height: "40px",
              paddingBottom: "7px",
              fontSize: "17px"
            }}
          >
            Create Profile
          </Link>
        );
      }
    }
    //
    //
    //
    //
    return (
      <div className="dashboard">
        <div className="container">
          {/* first section for User welcome and boards, profile and notifications card */}
          <div className="row">
            <div className="col-md-12 text-center">
              <br />
              <br />
              <br />

              <h1>
                Welcome To TaskBuddy {user.name}!
              </h1>
              <p className="lead">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit est laborum.
              </p>
              <section className="text-center my-5">
                <h2 className="h1-responsive font-weight-bold my-5">
                  Make It Simple!
                </h2>
                <p className="grey-text w-responsive mx-auto mb-5">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit est laborum.
                </p>
              </section>
            </div>
          </div>
          {/* //now we will display cards for Boards, profile handling and notifications */}
          <div className="row">
            {/* this col is for boards card */}
            <div className="col-md-4">
              <BoardsCard />
            </div>
            {/* this column is for profile handling */}
            <div className="col-md-4">
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={require('../../img/showcase.jpg')}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Profile
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Here You can manage your profile like edit your profile, delete and can create your profile if you don't have one.
          </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {dashboardContent}
                </CardActions>
              </Card>
            </div>
            {/* this col is for boards card */}
            <div className="col-md-4">
              <NotificationsCard noti={notification} />
            </div>
          </div>
          {/* Second portion for Some intro related to our activity */}
          <div className="row">
            <div className="col-md-12 text-center">
              <br />
              <br />
              <br />
              <br />
              <h1>
                Short View of Our Core Components!
              </h1>
              <br />
              <p className="lead">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit est laborum.cupidatat non proident, sunt in culpa qui officia deserunt
                mollit est laborum.
              </p>
              <br />
              <br />
              <br />
            </div>
          </div>
          {/* //now we will display cards for intro of lists, cards and privacy */}
          <div className="row">
            {/* this col is for list intro */}
            <div className="col-md-4">
              <ListCard />
            </div>
            {/* this col is for Cards intro */}
            <div className="col-md-4">
              <CardIntro />
            </div>
            {/* this col is for privacy intro */}
            <div className="col-md-4">
              <PrivacyIntro />
            </div>

          </div>


        </div>
      </div >
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  team: state.team
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getUsers }
)(Dashboard);
