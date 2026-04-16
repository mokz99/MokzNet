import { useState } from 'react'
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'
import dummyDashboard from './assets/dummy_dashboard.png'
import banana from './assets/peanutbutter_jelly_time.png'
import './App.css'
import Navbar from './Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <section id="about_and_meme">
        <div id="docs">
          <h2>About</h2>
          <p>Hello i am Simon :=) 💪😻💪</p>
          <ul>
            <li>
              <a href="https://www.youtube.com/@mokz99" target="_blank">
                <img src={youtubeLogo} alt="YouTube" style={{ height: '1em', width: 'auto' }}/>
                Youtube
              </a>
            </li>
            <li>
              <a href="https://github.com/mokz99" target="_blank">
                <img src={githubLogo} alt="GitHub" style={{ height: '1em', width: 'auto' }}/>
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <h2>Funi meme</h2>
          <img src={banana} alt="Dashboard" style={{ height: '10em', width: 'auto' }}/>
        </div>
      </section>
      

      <section id="spacer"></section>

      <section id="dashboard">
        <div>
          <h2>Server Dashboard</h2>
          <img src={dummyDashboard} alt="Dashboard" style={{ height: '20em', width: 'auto' }}/>
        </div>
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App
