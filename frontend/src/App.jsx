import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Pages
import Home from './Home';
import Guestbook from './Guestbook';
import Games from './Games';

// code stuff
import './App.css'
import Navbar from './NavBar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
