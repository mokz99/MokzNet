import default_avatar_wizard from './assets/mokznet_guestbook_wizard_2.png'

export default function GuestbookEntry({ username, date, message, avatarUrl }) {

    const avatarImageSrc = avatarUrl ? `${import.meta.env.VITE_BACKEND_API_URL}/uploads/${avatarUrl}` : default_avatar_wizard;

    return (
        <div className="guestbook-entry">
            <div className="entry-avatar">
                <img
                    src={avatarImageSrc}
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