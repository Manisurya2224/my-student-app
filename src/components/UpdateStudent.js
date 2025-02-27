import React, { useState } from "react";
import { getStudentById, updateStudent } from "../services/studentService"; // Import service
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./studentstyle.css";

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    subject1Marks: "",
    subject2Marks: "",
    subject3Marks: "",
  });

  const [fetchedStudent, setFetchedStudent] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setFetchedStudent(null); // Reset fetched student data
    setUpdatedStudent(null); // Reset updated student data
    setStudent({ id: "", name: "", subject1Marks: "", subject2Marks: "", subject3Marks: "" }); // Reset form
  };

  const handleFetchStudent = async () => {
    if (!student.id) {
      alert("Please enter a Student ID");
      return;
    }

    try {
      const data = await getStudentById(student.id); // Fetch student by ID
      if (!data) {
        alert("Student Not Found");
        return;
      }
      setFetchedStudent(data);
      setStudent(data);
      setUpdatedStudent(null);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateStudent(student.id, student); // Update student data
      setUpdatedStudent(data);
      setFetchedStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update Student</h1>

      <div className="fetch-section">
        <ul className="form-list">
          <li>
            <input type="text" name="id" placeholder="Enter Student ID" value={student.id} onChange={handleChange} required />
          </li>
          <li>
            <button className="fetch-button" onClick={handleFetchStudent}>
              Fetch Student
            </button>
          </li>
        </ul>
      </div>

      {fetchedStudent && !updatedStudent && (
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
              <button type="submit">Update</button>
            </li>
          </ul>
        </form>
      )}

      {updatedStudent && (
        <div className="saved-student">
          <h3>Student Updated Successfully</h3>
          <ul className="form-list">
            <li><strong>ID:</strong> {updatedStudent.id}</li>
            <li><strong>Name:</strong> {updatedStudent.name}</li>
            <li><strong>Subject 1 Marks:</strong> {updatedStudent.subject1Marks}</li>
            <li><strong>Subject 2 Marks:</strong> {updatedStudent.subject2Marks}</li>
            <li><strong>Subject 3 Marks:</strong> {updatedStudent.subject3Marks}</li>
            <li><strong>Total Marks:</strong> {updatedStudent.totalMarks}</li>
            <li><strong>Result:</strong> {updatedStudent.result}</li>
            <li><strong>Department:</strong> {updatedStudent.department}</li>
          </ul>
        </div>
      )}

      {/* Home and Back buttons */}
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleBack}>Back</button> {/* Reset to Fetch Form */}
      </div>
    </div>
  );
};

export default UpdateStudent;
