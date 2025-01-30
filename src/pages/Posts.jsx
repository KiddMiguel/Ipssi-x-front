import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard/PostCard';
import PostForm from '../components/PostForm/PostForm';
import {  getPosts, getPostsBefore } from '../redux/postSlice/postSlice';
import '../assets/styles/pages/Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { posts, status, loading, hasMore } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);
    const observer = useRef();

    console.log('posts:', posts);
    
    const lastPostElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(getPostsBefore());
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        dispatch(getPostsBefore());
    }, []);

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
                {posts.map((post, index) => (
                    <div 
                        key={post._id}
                        ref={index === posts.length - 1 ? lastPostElementRef : null}
                    >
                        <PostCard post={post} />
                    </div>
                ))}
                {loading && <div className="loading">Chargement...</div>}
                {!hasMore && <div className="no-more-posts">Plus de posts disponibles</div>}
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
