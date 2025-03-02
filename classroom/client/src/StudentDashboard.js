import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/student/attendance", {
      headers: { Authorization: localStorage.getItem("token") },
    }).then((res) => setAttendance(res.data));
  }, []);

  return (
    <div>
      <h2>Student Attendance</h2>
      {attendance.map((record, index) => (
        <p key={index}>{record.date} - {record.status}</p>
      ))}
    </div>
  );
}

export default StudentDashboard;
