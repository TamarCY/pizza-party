import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignUp from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn'
import HomeParty from './pages/homeParty/HomeParty';
import EditParty from './pages/editParty/EditParty'
import Navbar from './components/navbar/Navbar';
import GuestRequests from './pages/guestsRequests/GuestRequest';
import HomeGuest from './pages/homeGuest/HomeGuest';
import GuestEditPizza from './pages/guesEditPizza/GuestEditPizza';
import GuestEditDetails from './pages/guestEditDetails/GuestEditDetails';


function App() {
  const [authType, setAuthType] = useState("login");

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
    <Routes>   
      <Route path="/" element={<SignIn setAuthType={setAuthType}/>}/>
      <Route path="/sign-up" element={<SignUp setAuthType={setAuthType}/>}/>
      <Route path="/party" element={<HomeParty/>}/>
      <Route path="/edit-party" element={<EditParty/>}/>
      <Route path="/party-requests" element={<GuestRequests/>}/>
      <Route path="/guest-invitation/:id" element={<HomeGuest/>}/>
      <Route path="/guest-edit-details" element={<GuestEditDetails/>}/>
      <Route path="/guest-edit-pizza" element={<GuestEditPizza/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
