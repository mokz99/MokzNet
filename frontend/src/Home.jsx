import { useState } from 'react'

// images
import youtubeLogo from './assets/youtube.png'
import githubLogo from './assets/github.png'

// code stuff
import './App.css'
import ServerDashboard from './ServerDashboard';
import RandomDashboard from './RandomDashboard';

export default function Home() {
    return <div>
        <section id="about_and_dashboard">
            <div id="about">
                <h2>About Me</h2><br />
                <p>
                    Hello my name is Simon 😸👍<br /><br />
                    My hobbies are:<br />
                    &bull; gaming - mainly world of warcraft. ⚔️<br />
                    &bull; drawing - im not great but its fun. ✏️<br />
                    &bull; tech - this is also my day job. 💻<br /><br />

                    This website is a for fun project where i experiment with random stuff. The plan is also to make some games and host them here.<br /><br />
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
            <div id="dashboard">
                <h2>Server Dashboard</h2><br />
                <p>
                    This website is hosted on my own Raspberry Pi. Here is a dashboard to check the health of the server.<br /><br />
                </p>
                <ServerDashboard />
            </div>
        </section>

        <section id="highlight_and_random">
            <div id="random">
                <h2>Random lol</h2>
                <br />
                <RandomDashboard />
            </div>
            <div id="highlight">
                <h2>Highlighted Project</h2><br />
                <p>
                    Check this out :=)<br /><br />
                    TODO make something kool<br />
                </p>
            </div>
        </section>
        <section id="spacer"></section>
    </div>;
}