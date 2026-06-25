import default_wizard from './assets/mokznet_guestbook_wizard_2.png'
import default_dragon from './assets/mokznet_guestbook_dragon2.png'
import default_monster from './assets/mokznet_guestbook_monster.png'
import default_rose from './assets/mokznet_guestbook_rose.png'
import default_skull from './assets/mokznet_guestbook_skull.png'

const DEFAULT_AVATARS = {
    default_wizard,
    default_dragon,
    default_monster,
    default_rose,
    default_skull
};

export default function GuestbookEntry({ username, date, message, avatarUrl }) {

    let avatarImageSrc;

    if (avatarUrl && avatarUrl.startsWith('default_')) {
        avatarImageSrc = DEFAULT_AVATARS[avatarUrl] || default_wizard;
    } else if (avatarUrl) {
        avatarImageSrc = `${window.APP_CONFIG.VITE_BACKEND_API_URL}/uploads/${avatarUrl}`;
    } else {
        avatarImageSrc = default_wizard;
    }

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