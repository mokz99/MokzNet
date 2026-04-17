import { useState } from 'react'
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'
import dummyDashboard from './assets/dummy_dashboard.png'
import banana from './assets/peanutbutter_jelly_time.png'
import backgroundImage from './assets/mokznet_star_sky_1.png'
import './App.css'
import Navbar from './Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <section id="about_and_meme">
        <div id="about">
          <h2>About</h2><br/>
          <p>Hello i am Simon Mok :=) 💪😸👍<br/>
            Use use the name Mok and variation of it, as it comes from an old alias "Mokkil".<br/><br/>
            My hobbies are:<br/>
            &bull; gaming - mostly world of warcraft. ⚔️<br/>
            &bull; drawing - mostly on paper, i suck at digital art. ✏️<br/>
            &bull; technology - this is also my day job. 💻<br/><br/>

            I used to program alot of games in unity when i was younger, as i like game development because it intersects with all my hobbies.<br/>
            And i want to get back into it again and document the journey on youtube.<br/><br/>

            You can find my youtube account here, and also my github where this repository "MokzNet" is public if you want to look.
          </p>
          <ul>
            <li>
              <a href="https://www.youtube.com/@mokz99" target="_blank" className="hover-effect">
                <img src={youtubeLogo} alt="YouTube" style={{ height: '1em', width: 'auto' }}/>
                YouTube
              </a>
            </li>
            <li>
              <a href="https://github.com/mokz99" target="_blank" className="hover-effect">
                <img src={githubLogo} alt="GitHub" style={{ height: '1em', width: 'auto' }}/>
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div id="meme">
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
