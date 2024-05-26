import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createPost.css';

const CreatePost: React.FC = () => {
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [media, setMedia] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [mentions, setMentions] = useState<string>('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      const user_id = 1; // 実際にはログインユーザーのIDを使う

      const response = await fetch('http://localhost:5002/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          content: newPostContent,
          media,
          hashtags,
          mentions,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      await response.json();
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Media"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Hashtags"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Mentions"
        value={mentions}
        onChange={(e) => setMentions(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCreatePost} className="post-button">Post</button>
    </div>
  );
};

export default CreatePost;
