// src/services/studentService.js
const BASE_URL = "http://localhost:8080/api/students";

// Create a new student
export const createStudent = async (student) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!response.ok) throw new Error("Failed to save student");
  return response.json();
};

// Fetch a student by ID
export const getStudentById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) return null;
  return response.json();
};

// Update a student by ID
export const updateStudent = async (id, student) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!response.ok) throw new Error("Failed to update student");
  return response.json();
};
