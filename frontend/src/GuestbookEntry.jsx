export default function GuestbookEntry({ username, date, message, avatarUrl }) {
    return (
        <div className="guestbook-entry">
            <div className="entry-avatar">
                <img
                    src={avatarUrl || "https://placehold.co/150"}
                    alt={`${username}'s avatar`}
                />
            </div>
            <div className="entry-content">
                <div className="entry-header">
                    <span className="entry-username">{username}</span>
                    <span className="entry-date">{date}</span>
                </div>
                <p className="entry-message">{message}</p>
            </div>
        </div>
    );
}