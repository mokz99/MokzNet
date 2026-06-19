import './App.css'
import './Guestbook.css'
import React, { useState, useEffect, useRef } from 'react';
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
    const [currentTool, setCurrentTool] = useState('brush');
    const [isDrawing, setIsDrawing] = useState(false);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const canvasRef = useRef(null);

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

    //canvas drawing (click)
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Find where the mouse clicked relative to the canvas box
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (currentTool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
        } else {
            ctx.strokeStyle = '#000000';
        }
        ctx.beginPath();
        ctx.lineWidth = brushSize;
        ctx.moveTo(x, y);

        setIsDrawing(true);
    };
    //canvas drawing (move cursor)
    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Find where the mouse is moving to
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        //create line
        ctx.lineTo(x, y);
        //render the line black
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;

        setIsDrawing(false);

        const canvas = canvasRef.current;
        const snapshot = canvas.toDataURL();

        setUndoStack((prev) => [...prev, snapshot]);
        setRedoStack([]);
    };

    //handle undo and redo for drawing
    const handleUndo = () => {
        if (undoStack.length === 0) return; // Nothing to undo!

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 1. Take the current state off the undo stack
        const newUndo = [...undoStack];
        const poppedSnapshot = newUndo.pop();
        setUndoStack(newUndo);

        // 2. Put it onto the redo stack so we can bring it back if needed
        setRedoStack((prev) => [...prev, poppedSnapshot]);

        // 3. Clear the canvas and draw the *previous* state
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (newUndo.length > 0) {
            const previousImage = new Image();
            previousImage.src = newUndo[newUndo.length - 1]; // Get the image right before the one we popped
            previousImage.onload = () => {
                ctx.drawImage(previousImage, 0, 0);
            };
        }
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return; // Nothing to redo!

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 1. Take the snapshot from the redo stack
        const newRedo = [...redoStack];
        const poppedSnapshot = newRedo.pop();
        setRedoStack(newRedo);

        // 2. Put it back onto the undo stack
        setUndoStack((prev) => [...prev, poppedSnapshot]);

        // 3. Draw that snapshot back onto the canvas
        const redoImage = new Image();
        redoImage.src = poppedSnapshot;
        redoImage.onload = () => {
            ctx.drawImage(redoImage, 0, 0);
        };
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // 1. Physically wipe the canvas pixels clean
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. Take a snapshot of this blank canvas and push it to Undo history
        const snapshot = canvas.toDataURL();
        setUndoStack((prev) => [...prev, snapshot]);
        setRedoStack([]); // Reset redo
    };

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
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        width="500"
                        height="500"
                        style={{
                            background: '#fff',
                            border: '2px solid #ccc',
                            display: 'block',
                            margin: '0 auto',
                        }}
                    ></canvas>
                    <div className="canvas_controls" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                Brush Size:
                                <input type="number" min="1" max="20" value={brushSize}
                                    onChange={(e) => {
                                        const rawValue = e.target.value;
                                        if (rawValue === '') {
                                            setBrushSize('');
                                            return;
                                        }
                                        const val = Number(rawValue);
                                        if (val > 20) setBrushSize(20);
                                        else if (val < 1) setBrushSize(1);
                                        else setBrushSize(val);
                                    }}
                                />
                            </label>
                            <button type="button"
                                onClick={() => {
                                    // Toggle tool: if erasing, stop erasing. If drawing, start erasing.
                                    setCurrentTool(currentTool === 'eraser' ? 'brush' : 'eraser');
                                }}
                                style={{
                                    background: currentTool === 'eraser' ? '#000' : '#f0f0f0',
                                    color: currentTool === 'eraser' ? '#fff' : '#000',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer'
                                }}
                            >Eraser</button>
                            <button type="button" onClick={handleUndo}>Undo</button>
                            <button type="button" onClick={handleRedo}>Redo</button>
                            <button type="button" onClick={handleClear}>Clear</button>
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