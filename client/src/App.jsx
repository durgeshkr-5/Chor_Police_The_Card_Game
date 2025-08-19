import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css'
import { Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard"
import Profile from './pages/Profile';


function App() {
  

  return (
    <div>
        <Navbar />




    {/* routes */}

    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/dashboard"} element={<Dashboard />} />
      <Route path={"/profile"} element={<Profile />} />
    </Routes>




    </div>
  )
}

export default App
