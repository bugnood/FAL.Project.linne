import React from 'react';
import '../style/app.css';
import appLogo from '../assets/linne.svg';

const Header: React.FC = () => {
  return (
    <header>
      <div className='header-logo-content'>
        <img src={appLogo} />
        <h1 className='header-logo'>Linne</h1>
      </div>
    </header>
  );
};

export default Header;
