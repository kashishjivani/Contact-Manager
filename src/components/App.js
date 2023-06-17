import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";
import Temp from "./Temp";
import api from "../api/contacts";
import ContactCard from "./ContactCard";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

const retriveContacts = async () => {
  const response =await  api.get("/contacts");
  return response.data;
}

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    console.log("res:", response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
      console.log("con", contact);
      const response = await api.put(`/contacts/${contact.id}`, contact);
      const {id, name, email} = response.data;
      setContacts(contacts.map(contact => {
        return contact.id === id ? {...response.data}: contact;
      }))
  }

  const removeContactHandler = async (id) => {  
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Routes>
        {/* <Route path="/" Component={Header}/> */}
        <Route path="/add" Component={() => (<AddContact addContactHandler={addContactHandler} />)} />
        <Route path="/" exact Component={() => (<ContactList contacts={searchTerm.length < 1? contacts: searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />)} />
        <Route path="/contact/:id" Component={ContactDetail} />
        <Route path="/delete" Component={DeleteContact} />
        <Route path="/edittemp" Component={() => (<Temp updateContactHandler={updateContactHandler} />)} />
        {/* <Route path="/edit" element={(props) => <EditContact {...props} />} /> */}
        {/* <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler}/>)}/> */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;