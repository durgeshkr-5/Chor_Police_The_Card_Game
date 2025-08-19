import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css'
import { Routes,Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard"
import Profile from './pages/Profile';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import GameRoom from './pages/GameRoom';
import History from './pages/History';


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
      <Route path={"/create-room"} element={<CreateRoom />} />
      <Route path={"/join-room"} element={<JoinRoom />} />
      <Route path={"/game-room"} element={<GameRoom />} />
      <Route path={"/history"} element={<History />} />
    </Routes>




    </div>
  )
}

export default App
