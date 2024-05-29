import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/mirai-spectrum_icon.png';

const Top: React.FC = () => {
    return(
        <div className='top-container'>
            <div className='top-container-left-area'>

            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <img src={appLogo} alt='linne' />
                    <p>linneで日常をメッセージしよう！</p>
                    <button><Link to="/login">ログイン</Link></button>
                    <button><Link to="/register">新規登録</Link></button>
                    <p>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                    <p><Link to="">ユーザ名 or パスワードを忘れた場合</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Top;