import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../style/home.css';
import miraiSpectrumIcon from '../assets/mirai-spectrum_icon.png';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

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
      </div>
    </div>
  );
};

export default Home;
