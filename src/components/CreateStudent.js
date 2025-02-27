import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createStudent } from "../services/studentService"; // Import service
import "./studentstyle.css";

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    subject1Marks: "",
    subject2Marks: "",
    subject3Marks: "",
  });

  //pavan
  //surya

  const [savedStudent, setSavedStudent] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setSavedStudent(null); // Reset saved student data
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const data = await createStudent(student); // Use service function
      setSavedStudent(data);
      setStudent({ name: "", subject1Marks: "", subject2Marks: "", subject3Marks: "" });
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div className="container">
      <h1>Create Student</h1>

      {!savedStudent ? (
        <form onSubmit={handleSubmit}>
          <ul className="form-list">
            <li>
              <input type="text" name="name" placeholder="Enter Name" value={student.name} onChange={handleChange} required />
            </li>
            <li>
              <input type="number" name="subject1Marks" placeholder="Subject 1 Marks" value={student.subject1Marks} onChange={handleChange} required />
            </li>
            <li>
              <input type="number" name="subject2Marks" placeholder="Subject 2 Marks" value={student.subject2Marks} onChange={handleChange} required />
            </li>
            <li>
              <input type="number" name="subject3Marks" placeholder="Subject 3 Marks" value={student.subject3Marks} onChange={handleChange} required />
            </li>
            <li>
              <button type="submit">Save</button>
            </li>
          </ul>
        </form>
      ) : (
        <div className="saved-student">
          <h3>Student Saved Successfully</h3>
          <ul className="form-list">
            <li><strong>ID:</strong> {savedStudent.id}</li>
            <li><strong>Name:</strong> {savedStudent.name}</li>
            <li><strong>Subject 1 Marks:</strong> {savedStudent.subject1Marks}</li>
            <li><strong>Subject 2 Marks:</strong> {savedStudent.subject2Marks}</li>
            <li><strong>Subject 3 Marks:</strong> {savedStudent.subject3Marks}</li>
            <li><strong>Total Marks:</strong> {savedStudent.totalMarks}</li>
            <li><strong>Result:</strong> {savedStudent.result}</li>
            <li><strong>Department:</strong> {savedStudent.department}</li>
          </ul>
        </div>
      )}

      {/* Home and Back buttons */}
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default CreateStudent;
