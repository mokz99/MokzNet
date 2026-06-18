import './App.css'
import './Guestbook.css'
import React, { useState, useEffect } from 'react';
import GuestbookEntry from './GuestbookEntry';

export default function Guestbook() {
    const [signatures, setSignatures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [avatarDrawing, setAvatarDrawing] = useState(null);
    // Tracks whether the user is typing ('write') or drawing ('draw')
    const [viewMode, setViewMode] = useState('write');
    const [brushSize, setBrushSize] = useState(5);

    //fetch entries from backend
    useEffect(() => {
        fetch('http://localhost:8081/api/guestbook/entries')
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
                <div className={`guestbook_form_body ${viewMode === 'draw' ? 'hidden' : ''}`}>
                    <img
                        src={avatarDrawing || 'https://upload.wikimedia.org/wikipedia/en/8/87/Keyboard_cat.jpg'}
                        alt="Avatar Preview"
                        className="guestbook-img-preview"
                        onClick={() => setViewMode('draw')}
                        style={{
                            width: '200px',
                            height: '200px',
                            background: '#eee',
                            objectFit: 'contain',
                            cursor: 'pointer'
                        }}
                    />
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
                <div className={`guestbook_canvas_workspace ${viewMode === 'write' ? 'hidden' : ''}`}>
                    <canvas
                        width="500"
                        height="500"
                        style={{
                            background: '#fff',
                            border: '2px solid #ccc',
                            display: 'block',
                            margin: '0 auto',
                            width: '100%',
                        }}
                    ></canvas>
                    <div className="canvas_controls" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                Brush Size:
                                <input type="number" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
                            </label>

                            <button type="button">Eraser</button>

                            <button type="button">Undo</button>

                            <button type="button">Redo</button>

                            <button type="button">Clear</button>
                        </div>
                        <div>
                            <button type="button" onClick={() => setViewMode('write')}>Save & Return ◀</button>
                        </div>

                    </div>
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