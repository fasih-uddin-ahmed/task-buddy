import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Section1 from "./LandingPage/Section1";
import Section2 from "./LandingPage/Section2";
import Section3 from "./LandingPage/Section3";
// import NavbarTrans from "./NavbarTrans";

class Landing extends Component {
  //we are checking if someone tries to access landing page when he is login...then we will not allow him
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // howItWorks(e) {
  //   e.preventDefault();
  //   console.log('.........................');
  //   document.getElementById("view").scrollIntoView();
  // }

  render() {
    return (
      //<!-- Landing -->
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row align-items-center text-center text-md-left">
                <div className="col-lg-5">
                  {/* <h1 className="display-3 mb-4">Task Buddy</h1> */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1>Lets you work more collaboratively and get more done.</h1>
                  <Link
                    to="/register"
                    className="btn bg-transparent btn-lg  btn-info mt-2 mr-2"
                  >
                    Get Started
                  </Link>
                  <button
                    // onClick={this.howItWorks.bind(this)}
                    className="btn bg-transparent btn-lg  btn-info ml-2 mt-2 mr-2"
                  >
                    How It Works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Section1 id="view" />
        <Section2 />
        <Section3 />
      </div>
    );
  }
}

//declare properties here  as a good react practice
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

//here we are accessing our reducers from nicknames we assign to them using combine reducers
const mapStateToProps = state => ({
  auth: state.auth
});

//using connect to access reducers state and also our actions
export default connect(mapStateToProps)(Landing);
