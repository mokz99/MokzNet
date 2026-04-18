import { useState } from 'react'
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'
import dummyDashboard from './assets/dummy_dashboard.png'
import banana from './assets/peanutbutter_jelly_time.png'
import backgroundImage from './assets/mokznet_star_sky_1.png'
import monitorImage from './assets/monitor.png'
import './App.css'
import Navbar from './NavBar';
import ServerDashboard from './ServerDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <section id="about_and_meme">
        <div id="about">
          <h2>About Me</h2><br/>
          <p>
            Hello i am Simon Mok :=) 💪😸👍<br/>
            Use use the name Mok and variation of it like Mokz99, as it comes from an old alias "Mokkil".<br/><br/>
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
        <div>
          <h2>Server Dashboard</h2><br/>
            <p>
              This site, "Mokz.Net", is hosted on my own raspberry pi in my living room.<br/>
              Here is a little dashboard where you can see the statistics and health of the server itself.<br/><br/>
          </p>
          <ServerDashboard />
        </div>
      </section>
      
      <section id="spacer"></section>
      <section id="dashboard">

                <div id="meme">
          <h2>Random xD</h2>
          <img src={monitorImage} alt="Dashboard" style={{ height: '25em', width: 'auto' }}/>
          <img src={banana} alt="Dashboard" style={{ height: '10em', width: 'auto' }}/>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
