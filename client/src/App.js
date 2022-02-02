import { useState } from 'react';
import './App.css';
import SignUp from './pages/signup/Signup';

function App() {
  const [token, setToken] = useState("")
  const [authType, setAuthType] = useState("login");

  return (
    <div className="App">
     <h1>PIZZA PARTY</h1>
     <SignUp setToken={setToken} token={token} setAuthType={setAuthType}/>
    </div>
  );
}

export default App;
