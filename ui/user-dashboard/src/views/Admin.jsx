import React, { useState, useEffect } from "react";
import { PeopleTable } from "../components/person-table/table.component";
import Switch from "react-switch";
import styled from "styled-components";
import { Grid, Row, Col } from "react-flexbox-grid";
import "../styles/admin.style.scss"
import { GetWindowSize } from "../helpers/window-size";

export const Admin = () => {
  const [isSwitchToggled, setSwitchToggle] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  //function that handles and retrieve the value of the switch
  const handleSwitchChange = checked => {
    setSwitchToggle(checked);
  };

  useEffect(() => {}, [searchVal]);
  
  const [width] = GetWindowSize();
  return (
      <Grid style={{ width: "100%", marginTop: "4em"}}>
        <Row className="rows">
          <Col xs={12} sm={12} md={6} lg={6} style={{ textAlign: "left", padding: "0em 4em" }}>
            <Switch onChange={handleSwitchChange} checked={isSwitchToggled} />
            <span>Sorted by {isSwitchToggled ? "Name" : "Blacklist value"}</span>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} style={{ textAlign: `${width < 768 ? "left" : "right"}` , padding: "0em 4.8em" }}>
            <Input
              type={"text"}
              placeholder={"Enter a name to search"}
              onChange={e => {
                setSearchVal(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="rows">
            {/* {isDataLoaded ? ( */}
            <PeopleTable
              isSwitchToggled={isSwitchToggled}
              searchValue={searchVal}
            />
            {/* ) : null} */}
        </Row>
      </Grid>
  );
};

const Input = styled.input`
  background: white;
  padding: 0.4em;
  width: 250px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  border: 1px solid #2bba85;
  height: 10;
  transition: 0.3s;
  font-family: "Lexend Deca", sans-serif;
`;

