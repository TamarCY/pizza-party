import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignUp from './pages/signup/Signup';
import SignIn from './pages/signin/SignIn'
import HomeParty from './pages/homeParty/HomeParty';
import EditParty from './pages/editParty/EditParty'
import Navbar from './components/navbar/Navbar';
import HomeGuest from './pages/homeGuest/HomeGuest';
import GuestEditDetails from './pages/guestEditDetails/GuestEditDetails';
import GuestFinished from './pages/guestFinished/GuestFinished';
import PartyOrders from './pages/partyOrders/PartyOrders';
import GuestEditDrinks from './pages/guestEditDrinks/GuestEditDrinks';
import GuestEditDesserts from './pages/guestEditDesserts/GuestEditDesserts';
import GuestEditPizza from './pages/guestEditPizza/GuestEditPizza';
import SumDesserts from './components/sumDesserts/SumDesserts';


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
      <Route path="/party-orders" element={<PartyOrders/>}/>
      <Route path="/guest-invitation/:id" element={<HomeGuest/>}/>
      <Route path="/guest-edit-details" element={<GuestEditDetails/>}/>
      <Route path="/guest-edit-pizza" element={<GuestEditPizza/>}/>
      <Route path="/guest-edit-drinks" element={<GuestEditDrinks/>}/>
      <Route path="/guest-edit-desserts" element={<GuestEditDesserts/>}/>
      <Route path="/guest-finished" element={<GuestFinished/>}/>
      <Route path="/test" element={<SumDesserts/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
