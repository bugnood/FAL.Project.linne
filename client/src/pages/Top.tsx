import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/linne.svg';
import '../style/top.css';

const Top: React.FC = () => {

    return (
        <div className='top-container'>
            <div className='top-container-left-area'>
                <img src={appLogo} alt='linne' className='top-linne-icon' />
            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <h2 className='top-welcome-message'>linneで日常を<br />メッセージしよう！</h2>
                    <p className='top-solicitation-message'>さあ、みんなと日常を共有だ。</p>
                    <div className='top-participation-button'>
                        <Link to={'/login'} className='top-login-button'>ログイン</Link>
                        <Link to={'/register'} className='top-register-button'>新規登録</Link>
                    </div>
                    <p className='top-attention-message'>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                </div>
            </div>
        </div>
    );
};

export default Top;