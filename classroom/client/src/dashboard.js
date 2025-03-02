import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [tab, setTab] = useState("attendance");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!userRole) navigate("/"); 
    setRole(userRole);
  }, [navigate]);

  const renderContent = () => {
    if (role === "student") {
      switch (tab) {
        case "attendance": return <StudentAttendance />;
        case "timetable": return <StudentTimetable />;
        case "assignments": return <StudentAssignments />;
        default: return <StudentAttendance />;
      }
    } else if (role === "teacher") {
      switch (tab) {
        case "attendance": return <TeacherAttendance />;
        case "timetable": return <TeacherTimetable />;
        case "assignments": return <TeacherAssignments />;
        default: return <TeacherAttendance />;
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard ({role})</h1>
      <div className="flex gap-4 mt-4 border-b pb-2">
        {role === "student" ? (
          <>
            <button onClick={() => setTab("attendance")} className="btn">Attendance</button>
            <button onClick={() => setTab("timetable")} className="btn">Timetable</button>
            <button onClick={() => setTab("assignments")} className="btn">Assignments</button>
          </>
        ) : (
          <>
            <button onClick={() => setTab("attendance")} className="btn">Mark Attendance</button>
            <button onClick={() => setTab("timetable")} className="btn">Manage Timetable</button>
            <button onClick={() => setTab("assignments")} className="btn">Publish Assignments</button>
          </>
        )}
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}

const subjects = ["Web", "DAA", "DCN", "DBMS", "Prof. Comm.", "DBMS Lab", "DAA Lab"];
const attendanceData = subjects.map(subject => ({
  subject,
  attendance: Math.floor(Math.random() * 20) + 80 
}));

function StudentAttendance() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Attendance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={attendanceData}>
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="attendance" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function StudentTimetable() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Timetable</h2>
      <ul className="list-disc pl-5">
        {subjects.map((subject, index) => (
          <li key={index} className="text-lg">{subject}</li>
        ))}
      </ul>
    </div>
  );
}

const assignments = [
  { subject: "Web", title: "Build a React App" },
  { subject: "DBMS", title: "Design an ER Diagram" },
  { subject: "DAA", title: "Implement Dijkstra's Algorithm" }
];

function StudentAssignments() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Assignments</h2>
      <ul className="list-disc pl-5">
        {assignments.map((assignment, index) => (
          <li key={index} className="text-lg">
            {assignment.subject}: {assignment.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeacherAttendance() {
  return <div className="p-4">Teacher Attendance Management Page</div>;
}

function TeacherTimetable() {
  return <div className="p-4">Teacher Timetable Management Page</div>;
}

function TeacherAssignments() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Publish Assignments</h2>
      <form className="flex flex-col gap-2">
        <input type="text" placeholder="Assignment Title" className="border p-2" />
        <select className="border p-2">
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
        <button className="bg-blue-500 text-white p-2">Publish</button>
      </form>
    </div>
  );
}

export default Dashboard;
