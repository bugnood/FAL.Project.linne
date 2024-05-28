import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../style/home.css';
import miraiSpectrumIcon from '../assets/mirai-spectrum_icon.png';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (index: number) => {
    setEditMode(index);
    setEditedContent(posts[index].content);
  };

  const handleSave = async (index: number) => {
    try {
      const response = await fetch('http://localhost:5002/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: posts[index].post_id,
          content: editedContent,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save post');
      }
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts[index].content = editedContent;
        return newPosts;
      });
      setEditMode(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const response = await fetch(`http://localhost:5002/api/posts/${posts[index].post_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(prevPosts => prevPosts.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (index: number) => {
    const postId = posts[index].post_id;
    try {
      const response = await fetch(`http://localhost:5002/api/posts/like/${postId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to update like count');
      }
      const data = await response.json();
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts[index].likes_count = data.likes_count;
        return newPosts;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = async (index: number) => {
    const postId = posts[index].post_id;
    try {
      const response = await fetch(`http://localhost:5002/api/posts/favorite/${postId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to update favorite count');
      }
      const data = await response.json();
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        newPosts[index].favorite_count = data.favorite_count;
        return newPosts;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      {/* <h2>ホーム画面</h2>
      <p>楽しく日常を呟こう！</p>
      <Link to="/create-post">
        <button className="create-post-button">新規投稿</button>
      </Link>
      <h3>投稿一覧</h3> */}
      <div className="home-post">
        {posts.map((post, index) => (
          <div key={post.post_id} className='post-content-area'>
            <div className='post-left-area'>
              <img src={miraiSpectrumIcon} alt='プロフィールアイコン' className='user-icon' />
            </div>
            <div className='post-right-area'>
              <div className='user-info'>
                <p className='user-name'>ユーザー名</p>
                <p className='user-id'>ユーザーID</p>
              </div>
              <p className='post-content'>{post.content}</p>
              <div className='reaction-button'>
                <button onClick={() => handleLike(index)} className="like-button">
                  <FaHeart color="red" />
                  <span>{post.likes_count}</span>
                </button>
                <button onClick={() => handleFavorite(index)} className="favorite-button">
                  <FaStar color="yellow" />
                  <span>{post.favorite_count}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* {posts.map((post, index) => (
          <div key={post.post_id} className="post-card">
            {editMode === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => handleSave(index)} className="save-button">Save</button>
              </div>
            ) : (
              <div className="post-content">
                <p>{post.content}</p>
                <div className="button-container">
                  <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                  <button onClick={() => handleLike(index)} className="like-button">
                    <FaHeart color="red" />
                    <span>{post.likes_count}</span>
                  </button>
                  <button onClick={() => handleFavorite(index)} className="favorite-button">
                    <FaStar color="yellow" />
                    <span>{post.favorite_count}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Home;
