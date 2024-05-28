import React from 'react';
import { Link } from 'react-router-dom';
import '../style/app.css'; 

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
      <nav>
        <ul>
          <li><Link to="/home">タイムライン</Link></li>
          <li><Link to="/create-post">新規投稿</Link></li>
          <li><Link to="/register">新規登録</Link></li>
          <li><Link to="/">ログイン画面</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
