import React from "react";
//import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <div className="landing3">
      <div className="container pt-7 pb-6 text-center text-black ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>See how it works</h2>
            <h6>
              Go from idea to action in seconds with Trello’s intuitively simple
              boards, lists, and cards.
            </h6>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={require("../../../img/car1.jpg")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../../img/car2.jpg")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../../img/car3.jpg")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../../img/car4.jpg")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={require("../../../img/car5.jpg")}
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
