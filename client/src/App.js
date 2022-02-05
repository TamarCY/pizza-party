import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignUp from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn'
import HomeParty from './pages/home/HomeParty';
import EditParty from './pages/editParty/EditParty'
import Navbar from './components/navbar/Navbar';

function App() {
  const [token, setToken] = useState("")
  const [authType, setAuthType] = useState("login");

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
    <Routes>   
      <Route path="/" element={<SignIn setToken={setToken} token={token} setAuthType={setAuthType}/>}/>
      <Route path="/sign-up" element={<SignUp setToken={setToken} token={token} setAuthType={setAuthType}/>}/>
      <Route path="/party" element={<HomeParty/>}/>
      <Route path="/edit-party" element={<EditParty/>}/>
    </Routes>
    </BrowserRouter>
    {/* <SignIn setToken={setToken} token={token} setAuthType={setAuthType}/> */}
    </div>
  );
}

export default App;
