import React from "react";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <div className="landing1">
      <div className="container pt-7 pb-6 text-black landing1-inner">
        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-5  ">
            <img
              src={require("../../../img/pre3.gif")}
              width="800"
              alt="intro"
              className="img-fluid"
            />
          </div>

          <div className="col-lg-6 offset-md-1">
            {" "}
            <h1>Information at a glance</h1>
            <p className="lead">
              Dive into the details by adding comments, attachments, due dates,
              and more directly to Trello cards. Collaborate on projects from
              beginning to end
            </p>
            <p>
              {" "}
              <Link to="/register" className="btn btn-success btn-lg px-4">
                Start doing-->
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
