import { useState } from 'react';
import './App.css';
import Login from './components/login/SignUp';

function App() {
  const [token, setToken] = useState("")
  return (
    <div className="App">
     <h1>PIZZA PARTY</h1>
     <Login setToken={setToken} token={token}/>
    </div>
  );
}

export default App;
