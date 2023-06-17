import React from "react";
import EditContact from "./EditContact";
import { useLocation } from "react-router-dom";

const Temp = (props) => {
    const location = useLocation();
    // console.log("location:", location);
    // const { name, email } = location.state.contact;
    return(
        <div>
            <EditContact location={location} updateContactHandler={props.updateContactHandler} />
        </div>
    );
};

export default Temp;