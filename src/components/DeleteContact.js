import React from "react";
import { Link } from "react-router-dom";

const DeleteContact = (props) => {
  return (
    <div className="main">
        <div className="center-div">
            <h2> Are you sure?</h2>
            <Link to="/">
            <button className="ui button blue"> Yes</button>
            <button className="ui button red"> No</button>
            </Link>
        </div>
    </div>
    );
};

export default DeleteContact;
