import React from 'react';
import { Link } from 'react-router-dom';
import '../style/app.css';

const Sidebar: React.FC = () => {
  return (
    <aside>
      <div className='sidebar-panel'>
        <div className='sidebar-panel-heading'>メニュー</div>
        <div className='sidebar-list-group'>
          <Link to="/timeline">タイムライン</Link>
          {/* <Link to="/create-post">新規投稿</Link> */}
          <Link to="">プロフィール（近日実装）</Link>
          <Link to="">お気に入りの投稿（近日実装）</Link>
          <Link to="">注目している投稿（近日実装）</Link>
          <Link to="">メッセージ（近日実装）</Link>
          <Link to="">設定（近日実装）</Link>
          {/* <Link to="/register">新規登録</Link> */}
          {/* <Link to="/">ログイン画面</Link> */}
        </div>
      </div>
      {/* <nav>
        <ul>
          <li><Link to="/home">タイムライン</Link></li>
          <li><Link to="/create-post">新規投稿</Link></li>
          <li><Link to="/register">新規登録</Link></li>
          <li><Link to="/">ログイン画面</Link></li>
        </ul>
      </nav> */}
    </aside>
  );
};

export default Sidebar;