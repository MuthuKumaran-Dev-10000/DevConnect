import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addUser = () => {
    axios.post("http://localhost:5000/add-user", { name, email })
      .then(() => {
        setUsers([...users, { name, email }]);
        setName("");
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h2>Add User</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={addUser}>Submit</button>
    </div>
  );
}

export default App;
