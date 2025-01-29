import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard/PostCard';
import PostForm from '../components/PostForm/PostForm';
import { getPosts } from '../redux/postSlice/postSlice';
import '../assets/styles/pages/Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { posts, status } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    if (status === 'loading') return <div className="loading">Chargement...</div>;

    return (
        <div className="posts-container">
            <div className="posts-header">
                <h2>Accueil</h2>
                {user && (
                    <button 
                        className="create-post-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + Nouveau Post
                    </button>
                )}
            </div>

            <div className="posts-timeline">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button 
                            className="modal-close"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>
                        <PostForm onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
