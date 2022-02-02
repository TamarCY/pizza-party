import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignUp from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn'
import HomeParty from './pages/home/HomeParty';
import EditParty from './pages/editParty/EditParty'

function App() {
  const [token, setToken] = useState("")
  const [authType, setAuthType] = useState("login");

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>   
      <Route path="/party" element={<HomeParty/>}></Route>
      <Route path="/sign-up" element={<SignUp setToken={setToken} token={token} setAuthType={setAuthType}/>}></Route>
      <Route path="/" element={<SignIn setToken={setToken} token={token} setAuthType={setAuthType}/>}></Route>
    </Routes>
    </BrowserRouter>
    {/* <SignIn setToken={setToken} token={token} setAuthType={setAuthType}/> */}

    </div>
  );
}

export default App;
