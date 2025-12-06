import { useEffect, useState } from 'react';
import api from '../api/client';
import Header from '../components/Header';

interface Post {
    _id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    caption: string;
    likesCount: number;
    commentsCount: number;
    user?: {
        name: string;
        avatarUrl?: string;
    };
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/posts/feed')
            .then((res) => setPosts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="app-layout">
            <Header />
            <div className="container">
                {loading && <div className="text-center mt-4">Loading...</div>}
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <div style={{ padding: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#333' }}></div>
                            <span style={{ fontWeight: 600 }}>{post.user?.name || 'User'}</span>
                        </div>
                        {post.mediaType === 'video' ? (
                            <video src={post.mediaUrl} controls className="post-media" />
                        ) : (
                            <img src={post.mediaUrl} alt="Post" className="post-media" />
                        )}
                        <div style={{ padding: '1rem' }}>
                            <div className="flex gap-4 mb-2">
                                <button>❤️ {post.likesCount}</button>
                                <button>💬 {post.commentsCount}</button>
                            </div>
                            <p><span style={{ fontWeight: 600 }}>{post.user?.name}</span> {post.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Nav Placeholder */}
            <nav className="nav-bottom">
                <div className="nav-item active">🏠 Home</div>
                <div className="nav-item">🔍 Explore</div>
                <div className="nav-item">➕ Create</div>
                <div className="nav-item">👤 Profile</div>
            </nav>
        </div>
    );
}
