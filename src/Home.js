import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Home = () => {
  return (
    <div className="container">
      <h1>Student Management</h1>
      <ul className="button-list">
        <li>
          <Link to="/createstudent">
            <button className="create-button">Create Student</button>
          </Link>
        </li>
        <li>
          <Link to="/updatestudent">
            <button className="update-button">Update Student</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
