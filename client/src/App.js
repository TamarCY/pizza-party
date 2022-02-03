import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignUp from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn'
import HomeParty from './pages/home/HomeParty';
import EditParty from './pages/editParty/EditParty'
import HorizontalLinearStepper from './pages/editParty/HorizontalLinearStepper';

function App() {
  const [token, setToken] = useState("")
  const [authType, setAuthType] = useState("login");

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>   
      <Route path="/test" element={<HorizontalLinearStepper/>}/>
      <Route path="/" element={<SignIn setToken={setToken} token={token} setAuthType={setAuthType}/>}/>
      <Route path="/sign-up" element={<SignUp setToken={setToken} token={token} setAuthType={setAuthType}/>}/>
      <Route path="/party" element={<HomeParty/>}/>
    </Routes>
    </BrowserRouter>
    {/* <SignIn setToken={setToken} token={token} setAuthType={setAuthType}/> */}
    </div>
  );
}

export default App;
