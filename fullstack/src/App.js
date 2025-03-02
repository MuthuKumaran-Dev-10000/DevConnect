import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Ensure you have a CSS file

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [department, setDepartment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  // Fetch students from the server
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const addOrUpdateStudent = async () => {
    try {
      if (isEditing) {
        await axios.put("http://localhost:5000/students/${editId}", {
          name,
          regno,
          department,
        });
      } else {
        await axios.post("http://localhost:5000/students", {
          name,
          regno,
          department,
        });
      }
      fetchStudents();
      resetForm();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setRegno(student.regno);
    setDepartment(student.department);
    setEditId(student._id);
    setIsEditing(true);
    setShowForm(true); // Show form when editing
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete("http://localhost:5000/students/${id}");
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setRegno("");
    setDepartment("");
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h2>Student List</h2>
      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Student</button>
      
      {showForm && (
        <div className="form-container">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Reg No" value={regno} onChange={(e) => setRegno(e.target.value)} />
          <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <button className="save-btn" onClick={addOrUpdateStudent}>
            {isEditing ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={resetForm}>Cancel</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg No</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.regno}</td>
              <td>{student.department}</td>
              <td>
                <button className="edit-btn" onClick={() => editStudent(student)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;