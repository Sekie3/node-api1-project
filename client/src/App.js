import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', bio: '' });

  useEffect(() => {
    fetch('http://localhost:9000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:9000/api/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error:', error));
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    fetch('http://localhost:9000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(newUser => setUsers([...users, newUser]))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* User list */}
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.bio}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Add user form */}
        <form onSubmit={handleAddUser}>
          <input 
            type="text" 
            value={newUser.name} 
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
            placeholder="Name" 
          />
          <input 
            type="text" 
            value={newUser.bio} 
            onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })} 
            placeholder="Bio" 
          />
          <button type="submit">Add User</button>
        </form>
      </header>
    </div>
  );
}

export default App;
