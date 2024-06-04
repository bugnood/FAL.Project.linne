// src/components/Top.tsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/linne.svg';
import ReactModal from 'react-modal';
import LoadingSpinner from '../components/LoadingSpinner';
import CustomInput from '../components/CustomInput';
import DateOfBirthInput from '../components/DateOfBirthInput';
import { FaTimes } from 'react-icons/fa';
import '../style/top.css';
// import { useLogin } from '../hooks/useLogin';
import FormField from '../components/FormField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import Input from '../components/input/Input';

// アプリケーションのルート要素を設定
ReactModal.setAppElement('#root');

const Top: React.FC = () => {
    // ログインおよび登録モーダルの状態を管理
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    // ローディング状態を管理
    const [isLoading, setIsLoading] = useState(false);

    // 電話番号を使用するかどうかの状態を管理
    const [usePhoneNumber, setUsePhoneNumber] = useState(true);

    // フォームの参照を作成
    const registerUsernameRef = useRef<HTMLInputElement>(null);
    const loginUsernameRef = useRef<HTMLInputElement>(null);

    // ログインのカスタムフックから状態および関数を取得
    // const {
    //     username,
    //     setUsername,
    //     password,
    //     setPassword,
    //     message,
    //     handleLogin
    // } = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/auth/login', { username, password });
            setMessage(response.data.message);
            if (response != null) {
                navigate('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data.message || 'An error occurred');
            } else {
                setMessage('An error occurred');
            }
        }
    };

    // 登録モーダルを開く関数
    const openRegisterModal = () => {
        setIsLoading(true);
        setRegisterModalIsOpen(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (registerUsernameRef.current) {
                registerUsernameRef.current.focus();
            }
        }, 1000);

        return () => clearTimeout(timer);
    };

    // 登録モーダルを閉じる関数
    const closeRegisterModal = () => {
        setIsLoading(false);
        setRegisterModalIsOpen(false);
    };

    // ログインモーダルを開く関数
    const openLoginModal = () => {
        setIsLoading(true);
        setLoginModalIsOpen(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (loginUsernameRef.current) {
                loginUsernameRef.current.focus();
            }
        }, 1000);

        return () => clearTimeout(timer);
    };

    // ログインモーダルを閉じる関数
    const closeLoginModal = () => {
        setIsLoading(false);
        setLoginModalIsOpen(false);
    };

    // 入力方法を切り替える関数
    const toggleInputMethod = () => {
        setUsePhoneNumber(!usePhoneNumber);
    };

    return (
        <div className='top-container'>
            {/* 登録モーダル */}
            <ReactModal
                isOpen={registerModalIsOpen}
                onRequestClose={closeRegisterModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="Register Modal"
                className={"top-register-modal"}
                overlayClassName="custom-overlay"
            >
                <div className='top-modal-content'>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className='top-modal-topArea'>
                                <button className='close-button' onClick={closeRegisterModal}><FaTimes /></button>
                            </div>
                            <h1 className='top-modal-guidance'>アカウントを作成</h1>
                            <form className="top-form">
                                <CustomInput ref={registerUsernameRef} label="ユーザーネーム" type="text" placeholder="ユーザーネームを入力" />
                                {usePhoneNumber ? (
                                    <CustomInput label="電話番号" type="tel" placeholder="電話番号を入力" />
                                ) : (
                                    <CustomInput label="メールアドレス" type="email" placeholder="メールアドレスを入力" />
                                )}
                                <a className='top-phone-email-change-link' onClick={toggleInputMethod}>
                                    {usePhoneNumber ? 'かわりにメールアドレスを登録する' : 'かわりに電話番号を登録する'}
                                </a>
                                <div className='top-date-form'>
                                    <p className='top-date-form-title'>生年月日</p>
                                    <p className='top-date-form-note'>この情報は公開されません。このアカウントをビジネス、ペットなどに使う場合でも、ご自身の年齢を確認してください。</p>
                                    <DateOfBirthInput />
                                </div>
                                <a className='top-next-button'>新規登録</a>
                            </form>
                        </>
                    )}
                </div>
            </ReactModal>

            {/* ログインモーダル */}
            <ReactModal
                isOpen={loginModalIsOpen}
                onRequestClose={closeLoginModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="Login Modal"
                className={"top-login-modal"}
                overlayClassName="custom-overlay"
            >
                <div className='top-modal-content'>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className='top-modal-topArea'>
                                <button className='close-button' onClick={closeLoginModal}><FaTimes /></button>
                            </div>
                            <h1 className='top-modal-guidance'>ログイン</h1>
                            {/* <form className="top-form" onSubmit={handleLogin}>
                                <Input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                            {/* <FormField
                                    id="username"
                                    label="ユーザー名 または メールアドレス"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                /> */}
                            {/* <FormField
                                    id="password"
                                    label="パスワード"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                /> */}
                            {/* <button type="submit" className='top-next-button'>ログイン</button>
                            </form> */}
                            <Link to={'/login'}></Link>
                        </>
                    )}
                </div>
            </ReactModal>

            {/* レイアウト */}
            <div className='top-container-left-area'>
                <img src={appLogo} alt='linne' className='top-linne-icon' />
            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <h2 className='top-welcome-message'>linneで日常を<br />メッセージしよう！</h2>
                    <p className='top-solicitation-message'>さあ、みんなと日常を共有だ。</p>
                    <div className='top-participation-button'>
                        {/* ログインボタン */}
                        <Link to={'/login'}>ログイン</Link>
                        {/* <a className='top-login-button' onClick={openLoginModal}><span>ログイン</span></a> */}
                        {/* 新規登録ボタン */}
                        <Link to={'/register'}>新規登録</Link>
                        {/* <a className='top-register-button' onClick={openRegisterModal}><span>新規登録</span></a> */}
                    </div>
                    {/* 注意メッセージ */}
                    <p className='top-attention-message'>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                </div>
            </div>
        </div>
    );
};

export default Top;