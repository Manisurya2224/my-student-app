import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/studentService";
import "./studentstyle.css";

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    subject1Marks: "",
    subject2Marks: "",
    subject3Marks: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    subject1Marks: "",
    subject2Marks: "",
    subject3Marks: "",
  });

  const [savedStudent, setSavedStudent] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "name") {
      const nameRegex = /^[a-zA-Z0-9\s]+$/;
      if (!nameRegex.test(value)) {
        errorMessage = "Please enter a valid Name.";
      }
    } else if (name.includes("Marks")) {
      if (value < 0 || value > 50) {
        errorMessage = "Please enter valid marks (0-50).";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (savedStudent) {
      setSavedStudent(null);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    try {
      const data = await createStudent(student);
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
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={student.name}
                onChange={handleChange}
                required
                className={errors.name ? "error-input" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </li>
            <li>
              <input
                type="number"
                name="subject1Marks"
                placeholder="Subject 1 Marks"
                value={student.subject1Marks}
                onChange={handleChange}
                required
                className={errors.subject1Marks ? "error-input" : ""}
              />
              {errors.subject1Marks && <p className="error-text">{errors.subject1Marks}</p>}
            </li>
            <li>
              <input
                type="number"
                name="subject2Marks"
                placeholder="Subject 2 Marks"
                value={student.subject2Marks}
                onChange={handleChange}
                required
                className={errors.subject2Marks ? "error-input" : ""}
              />
              {errors.subject2Marks && <p className="error-text">{errors.subject2Marks}</p>}
            </li>
            <li>
              <input
                type="number"
                name="subject3Marks"
                placeholder="Subject 3 Marks"
                value={student.subject3Marks}
                onChange={handleChange}
                required
                className={errors.subject3Marks ? "error-input" : ""}
              />
              {errors.subject3Marks && <p className="error-text">{errors.subject3Marks}</p>}
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
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default CreateStudent;
