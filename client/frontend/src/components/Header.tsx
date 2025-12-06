import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="flex items-center justify-between container">
            <Link to="/" className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                NAMI
            </Link>
            <div className="flex gap-4">
                {/* Placeholder for notification Icon or profile Link */}
                <Link to="/profile" className="btn-ghost" style={{ padding: '8px', borderRadius: '50%' }}>
                    Profile
                </Link>
            </div>
        </header>
    );
}
