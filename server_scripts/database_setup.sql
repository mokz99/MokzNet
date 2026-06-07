-- how to enter db: sqlite3 mokznet.db
-- how to exit: .exit

CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    message TEXT NOT NULL,
    avatar_filename TEXT,
    is_hidden INTEGER DEFAULT 0, -- 0 is false/displayed, 1 is true/hidden
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
