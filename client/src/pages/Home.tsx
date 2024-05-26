import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // 投稿の状態を保持するための状態変数
  const [editMode, setEditMode] = useState<number | null>(null); // 編集モードを管理する状態変数
  const [editedContent, setEditedContent] = useState<string>(''); // 編集中の投稿内容を保持する状態変数

  useEffect(() => {
    // API経由で投稿を取得する関数を定義
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/posts'); // APIのエンドポイントにリクエストを送信
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json(); // レスポンスデータをJSON形式に変換
        setPosts(data); // 取得した投稿データを状態変数にセット
      } catch (error) {
        console.error(error);
        setPosts([]); // エラーが発生した場合、空の配列をセットしてエラーを解決
      }
    };
  
    fetchPosts(); // 関数を呼び出し、投稿を取得する
  }, []);

  // 投稿内容を編集する関数
  const handleEdit = (index: number) => {
    setEditMode(index); // 編集モードに切り替える
    setEditedContent(posts[index].content); // 編集中の投稿内容をセットする
  };

  // 編集モードでの投稿内容を保存する関数
  const handleSave = async (index: number) => {
    try {
      const response = await fetch('http://localhost:5002/api/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: posts[index].post_id, // 修正点
          content: editedContent,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save post');
      }
      // サーバーからのレスポンスを取得してデータを更新する
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        newPosts[index].content = editedContent; // 投稿の内容を更新
        return newPosts;
      });
      // 編集モードを解除する
      setEditMode(null);
    } catch (error) {
      console.error(error);
    }
  };

  // 投稿を削除する関数
  const handleDelete = async (index: number) => {
    try {
      const response = await fetch(`http://localhost:5002/api/posts/${posts[index].post_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(prevPosts => prevPosts.filter((_, i) => i !== index)); // 削除された投稿を除外する
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <h2>ホーム画面</h2>
      <p>楽しく日常を呟こう！</p>
      <Link to="/create-post">
        <button className="create-post-button">新規投稿</button>
      </Link>
      <h3>投稿一覧</h3>
      <div className="posts-grid">
        {posts.map((post, index) => (
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
                <div>
                  <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
