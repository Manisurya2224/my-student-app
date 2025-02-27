import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import UpdateStudent from "./components/UpdateStudent";
import Home from "./Home";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createstudent" element={<CreateStudent />} />
        <Route path="/updatestudent" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
