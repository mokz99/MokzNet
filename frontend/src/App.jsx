import { useState } from 'react'
// images
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'
import backgroundImage from './assets/mokznet_star_sky_1.png'

// code stuff
import './App.css'
import Navbar from './NavBar';
import ServerDashboard from './ServerDashboard';
import RandomDashboard from './RandomDashboard';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <section id="about_and_dashboard">
        <div id="about">
          <h2>About Me</h2><br />
          <p>
            Hello i am Simon 😸👍<br /><br />
            My hobbies are:<br />
            &bull; gaming - mainly world of warcraft. ⚔️<br />
            &bull; drawing - not great at it but i still enjoy it. ✏️<br />
            &bull; tech - this is also my day job. 💻<br /><br />

            I used to program alot of games in unity when i was younger. I liked it as it involves many things i enjoy.<br />
            I want to get back into it again and document the journey on youtube.<br /><br />

            This website is sort of just a personal website im making for fun to have a central place for my projects.<br /><br />
            You can find my youtube account here, and also my github where this repository "MokzNet" is public if you want to look.
          </p>
          <ul>
            <li>
              <a href="https://www.youtube.com/@mokz99" target="_blank" className="hover-effect">
                <img src={youtubeLogo} alt="YouTube" style={{ height: '1em', width: 'auto' }} />
                YouTube
              </a>
            </li>
            <li>
              <a href="https://github.com/mokz99" target="_blank" className="hover-effect">
                <img src={githubLogo} alt="GitHub" style={{ height: '1em', width: 'auto' }} />
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Server Dashboard</h2><br />
          <p>
            This site, "Mokz.Net", is hosted on my own raspberry pi in my living room.<br />
            Here is a little dashboard where you can see the statistics and health of the server itself.<br /><br />
          </p>
          <ServerDashboard />
        </div>
      </section>

      <section id="highlight_and_random">
        <div id="about">
          <h2>Random lol</h2>
          <RandomDashboard />
        </div>
        <div id="about">
          <h2>Highlighted Project</h2><br />
          <p>
            Check this out :=)<br /><br />
            TODO make something kool<br />
          </p>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
