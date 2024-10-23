import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Recipepage } from './Pages/Recipepage'
import { Homepage } from './Pages/Homepage'
import { Createpage } from './Pages/Createpage'
import { Titlepage } from './Pages/Titlepage'
import { RegisterForm } from './Pages/Register'
import { LoginForm } from './Pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titlepage />} />
        <Route path="/recipes" element={<Homepage />} />
        <Route path="/recipes/:id" element={<Recipepage />} />
        <Route path="/add-recipe" element={<Createpage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App
