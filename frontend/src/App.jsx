import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

function LogOut(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogOut(){
  localStorage.clear()
  return <Register />
}

function HomeWithNavBar(){
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login', {replace: true})
  }

  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Home />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<ProtectedRoute><HomeWithNavBar /></ProtectedRoute>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<RegisterAndLogOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
