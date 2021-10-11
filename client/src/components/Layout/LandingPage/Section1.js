import React from "react";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <div className="landing1">
      <div className="container pt-7 pb-6 text-black landing1-inner">
        <div className="row align-items-center text-center text-md-left">
          <div className="col-lg-6">
            {" "}
            <h1>
              Trello lets you work more collaboratively and get more done.
            </h1>
            <p className="lead">
              Trello’s boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </p>
            <p>
              {" "}
              <Link to="/register" className="btn btn-success btn-lg px-4">
                Sign Up – It’s Free!
              </Link>{" "}
            </p>
          </div>
          <div className="col-lg-6  ">
            <img
              src={require("../../../img/pre2.jpg")}
              width="582"
              alt="intro"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
