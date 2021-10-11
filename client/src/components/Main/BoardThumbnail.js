import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Thumbnail = styled.div`
  height: 140px;
  width: 700px;
  padding: 5px;
  display: flex;
  cursor: pointer;
`;
// border-radius: 3px;
// box-shadow: 0 2px 4px grey;
// justify-content: center;
// align-items: center;
const Title = styled.h4`
  color: black;
  text-decoration: none;
`;

const BoardThumbnail = ({ title, description, id, members }) => {
  console.log(title);
  return (
    <Thumbnail>
      <div style={{ flexDirection: "vertical" }}>
        <h4
          style={{
            color: "black",
            marginLeft: "5px",
            marginTop: "20px",
            width: "100%"
          }}
        >
          {title}
        </h4>
        <div
          style={{
            fontSize: "17px",
            color: "black",
            marginLeft: "12px",
            marginTop: "35px",
            width: "100%",
            height: "27%"
          }}
        >
          <Typography>{description}</Typography>
        </div>
      </div>
    </Thumbnail>
  );
};

export default BoardThumbnail;
