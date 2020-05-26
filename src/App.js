import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.components";
import ExercisesList from "./components/kremowka-list";
import LoginUser from "./components/login-user";
import EditKremowka from "./components/edit-kremowka";
import CreateKremowka from "./components/kremowka-create";
import CreateUser from "./components/create-user";

//import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/login" component={LoginUser} />
        <Route path="/edit/:id" component={EditKremowka} />
        <Route path="/create" component={CreateKremowka} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
