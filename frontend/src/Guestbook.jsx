import './App.css'
import './Guestbook.css'
import React, { useState, useEffect } from 'react';
import GuestbookEntry from './GuestbookEntry';

export default function Guestbook() {
    const [signatures, setSignatures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetch entries from backend
    useEffect(() => {
        fetch('https://api.mokz.net/api/guestbook/entries')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to summon guestbook entries');
                }
                return response.json();
            })
            .then((data) => {
                setSignatures(data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    //page management 
    const entriesPerPage = 4;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const sortedSignatures = [...signatures].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });
    const currentEntries = sortedSignatures.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(signatures.length / entriesPerPage) || 1;

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    if (loading) return <div className="guestbook-loading">Loading scrolls...</div>;
    if (error) return <div className="guestbook-error">Error: {error}</div>;

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
                    {currentEntries.map((sig) => (
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
                    <button className='page-btn' type='button' onClick={prevPage} disabled={currentPage === 1}>◀</button>
                    <span className='page-number'>Page {currentPage} of {totalPages}</span>
                    <button className='page-btn' type='button' onClick={nextPage} disabled={currentPage === totalPages}>▶</button>
                </div>
            </div>
        </section>

        <section id="spacer"></section>
    </div>;
}