import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/postSlice/postSlice";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuthor = user?.username === post.author;

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      dispatch(deletePost(post._id));
    }
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <span className="post-author">Par {post.author}</span>
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="post-actions">
        <button className="like-btn">❤️ {post.likes?.length || 0}</button>
        {isAuthor && (
          <>
            <button className="delete-btn" onClick={handleDelete}>
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
