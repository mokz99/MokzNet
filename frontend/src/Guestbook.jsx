import './App.css'
import './Guestbook.css'

export default function Guestbook() {
    return <div>
        <section id="guestbook_rules_and_form">
            <div id="guestbook_rules">
                <h2>Welcome to the guestbook</h2><br />
                <p>Say hello, and draw a custom avatar, or select a default image 📖🪶</p><br />
                <p>Please keep it civil or i will remove the post 😇</p><br />
                <p>Posting is limited to about once pr week to prevent my server exploding 🔥</p>
                <br />
            </div>
            <div id="guestbook_form">
                <h2>Sign guestbook</h2>
                <div className="guestbook_form_body">
                  <canvas width="200" height="200" style={{ background: '#eee' }}></canvas>
                  <form>
                    <input type="text" id="username" placeholder="Your name..."/>
                    <textarea name="message" id="message" placeholder="Write your message..."></textarea>
                    <select name="default_avatar" id="avatar_select" defaultValue="placeholder">
                      <option value="placeholder" disabled hidden>Optional: select a default avatar</option>
                      <option value="dragon">Dragon</option>
                      <option value="rose">Rose</option>
                      <option value="wizard">Wizard</option>
                    </select>
                    <button type="submit">Submit Message</button>
                  </form>
                </div>
            </div>
        </section>

        <section id="guestbook_wrapper">
            <div id="guestbook_content">
                <h2>Guestbook signatures</h2><br />
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
                <p>Dummytext</p>
            </div>
        </section>

        <section id="spacer"></section>
    </div>;
}