import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
      <Link to="/create-post"><button>Create Post</button></Link>
      <h3>Posts</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={post.post_id}>
            {editMode === index ? (
              <div>
                <input type="text" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                <button onClick={() => handleSave(index)}>Save</button>
              </div>
            ) : (
              <div>
                {post.content}
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
