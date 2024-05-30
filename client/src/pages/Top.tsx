import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/linne.svg';
import ReactModal from 'react-modal';
import '../style/top.css';

// アクセシビリティのためにルート要素を設定します
ReactModal.setAppElement('#root');

const Top: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='top-container'>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
            >
                <h2>モーダルの内容</h2>
                <button onClick={() => setModalIsOpen(false)}>閉じる</button>
            </ReactModal>

            <div className='top-container-left-area'>
                <img src={appLogo} alt='linne' className='top-linne-icon' />
            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <h2 className='top-welcome-message'>linneで日常を<br />メッセージしよう！</h2>
                    <p className='top-solicitation-message'>さあ、みんなと日常を共有だ。</p>
                    <div className='top-participation-button'>
                        <Link to="/login" className='top-login-button'><span>ログイン</span></Link>
                        <a className='top-register-button' onClick={() => setModalIsOpen(true)}><span>新規登録</span></a>
                    </div>
                    <p className='top-attention-message'>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                </div>
            </div>
        </div>
    );
};

export default Top;