import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    // console.log(props);

    const deleteConactHandler = (id) => {
        props.getContactId(id);
    };
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact}
                clickHander={deleteConactHandler}
                key={
                    contact.id
                }/>
        );
    });

    const inputEl = useRef("");
    const getSearchTerm = (e) => {
        // console.log(e.target.value);
        props.searchKeyword(inputEl.current.value);
    }
    return (
        <div className="main">
            <h2>
                Contact List
                <Link to="/add">
                <button className="ui button blue right" style={{marginLeft: "100px"}}>
                    Add Contact</button>
                    </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref= {inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}></input>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0? renderContactList: "No Contacts Available!"} </div>
        </div>
    );
};

export default ContactList;
