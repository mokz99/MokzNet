import './App.css'
import './Guestbook.css'
import GuestbookEntry from './GuestbookEntry';

export default function Guestbook() {
    const dummySignatures = [
        { id: 1, username: "Mokz", date: "2026-06-13", message: "FIIIIIIIIIIIIIIRST", avatarUrl: "" },
        { id: 2, username: "Angeryboi", date: "2026-06-12", message: "wow this site suxx!", avatarUrl: "" },
        { id: 3, username: "Turtlelover9", date: "2026-06-10", message: "hello i like turtles", avatarUrl: "" },
        { id: 4, username: "Oceanman", date: "2026-06-10", message: "OCEAN MAN 🌊 😍 Take me by the hand ✋ lead me to the land that you understand 🙌 🌊 OCEAN MAN 🌊 😍 The voyage 🚲 to the corner of the 🌎 globe is a real trip 👌 🌊 OCEAN MAN 🌊 😍 The crust of a tan man 👳 imbibed by the sand 👍 Soaking up the 💦 thirst of the land 💯", avatarUrl: "" }
    ];

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
                <h2>Sign guestbook</h2><br />
                <div className="guestbook_form_body">
                    <canvas width="200" height="200" style={{ background: '#eee' }}></canvas>
                    <form>
                        <input type="text" id="username" placeholder="Your name..." />
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
                <div className='signatures-list'>
                    {dummySignatures.map((sig) => (
                        <GuestbookEntry
                            key={sig.id}
                            username={sig.username}
                            date={sig.date}
                            message={sig.message}
                            avatarUrl={sig.avatarUrl}
                        />
                    ))}
                </div>
                <div className='book-pages'>
                    <button className='page-btn' type='button'>◀</button>
                    <span className='page-number'>Page 1 of 5</span>
                    <button className='page-btn' type='button'>▶</button>
                </div>
            </div>
        </section>

        <section id="spacer"></section>
    </div>;
}