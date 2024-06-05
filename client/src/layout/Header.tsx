import React from 'react';
import '../style/app.css';
import appLogo from '../assets/linne.svg';
import { FaUser } from "react-icons/fa6";
import { useUser } from '../contexts/UserContext';

const Header: React.FC = () => {

  // ログイン情報取得
  const { user } = useUser();

  return (
    <header>
      <div className='header-logo-content'>
        <img src={appLogo} />
        <h1 className='header-logo'>Linne</h1>
      </div>
      <div className='user-info-content'>
        <FaUser />
        <p>{user?.username != null ? user?.username : 'ゲスト'} さん</p>
      </div>
    </header>
  );
};

export default Header;
