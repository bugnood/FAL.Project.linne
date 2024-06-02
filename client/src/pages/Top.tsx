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
import { useLogin } from '../hooks/useLogin';
import FormField from '../components/FormField';

ReactModal.setAppElement('#root');

const Top: React.FC = () => {
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usePhoneNumber, setUsePhoneNumber] = useState(true);
    const registerUsernameRef = useRef<HTMLInputElement>(null);
    const loginUsernameRef = useRef<HTMLInputElement>(null);

    const {
        username,
        setUsername,
        password,
        setPassword,
        message,
        handleLogin
    } = useLogin();

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

    const closeRegisterModal = () => {
        setIsLoading(false);
        setRegisterModalIsOpen(false);
    };

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

    const closeLoginModal = () => {
        setIsLoading(false);
        setLoginModalIsOpen(false);
    };

    const toggleInputMethod = () => {
        setUsePhoneNumber(!usePhoneNumber);
    };

    return (
        <div className='top-container'>
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
                            <form className="top-form" onSubmit={handleLogin}>
                                {/* <CustomInput ref={loginUsernameRef} label="ユーザーネーム" type="text" placeholder="ユーザーネームを入力" />
                                <CustomInput label="パスワード" type="password" placeholder="パスワードを入力" /> */}
                                <FormField
                                    id="username"
                                    label="ユーザー名 または メールアドレス"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input-field"
                                />
                                <FormField
                                    id="password"
                                    label="パスワード"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                />
                                <button type="submit" className='top-next-button'>ログイン</button>
                            </form>
                        </>
                    )}
                </div>
            </ReactModal>

            <div className='top-container-left-area'>
                <img src={appLogo} alt='linne' className='top-linne-icon' />
            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <h2 className='top-welcome-message'>linneで日常を<br />メッセージしよう！</h2>
                    <p className='top-solicitation-message'>さあ、みんなと日常を共有だ。</p>
                    <div className='top-participation-button'>
                        <a className='top-login-button' onClick={openLoginModal}><span>ログイン</span></a>
                        <a className='top-register-button' onClick={openRegisterModal}><span>新規登録</span></a>
                    </div>
                    <p className='top-attention-message'>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                </div>
            </div>
        </div>
    );
};

export default Top;