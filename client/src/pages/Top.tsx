// src/components/Top.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/linne.svg';
import ReactModal from 'react-modal';
import LoadingSpinner from '../components/LoadingSpinner'; // インポート
import CustomInput from '../components/CustomInput';
import DateOfBirthInput from '../components/DateOfBirthInput';
import { FaTimes } from 'react-icons/fa';
import '../style/top.css';

ReactModal.setAppElement('#root');

const Top: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [usePhoneNumber, setUsePhoneNumber] = useState(true);
    const usernameRef = useRef<HTMLInputElement>(null); // ユーザー名の入力フォームの参照を作成

    const openModal = () => {
        setIsLoading(true);
        setModalIsOpen(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (usernameRef.current) {
                usernameRef.current.focus(); // モーダルが開いたらユーザー名の入力フォームにフォーカス
            }
        }, 1000);

        return () => clearTimeout(timer);
    };

    const closeModal = () => {
        setIsLoading(false);
        setModalIsOpen(false);
    };

    const toggleInputMethod = () => {
        setUsePhoneNumber(!usePhoneNumber);
    };

    return (
        <div className='top-container'>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                contentLabel="Example Modal"
                className={"top-register-modal"}
                overlayClassName="custom-overlay"
            >
                <div className='top-modal-content'>
                    {isLoading ? (
                        <LoadingSpinner /> // 読み込み中はスピナーを表示
                    ) : (
                        <>
                            <div className='top-modal-topArea'>
                                <button className='close-button' onClick={closeModal}><FaTimes /></button>
                            </div>
                            <h1 className='top-modal-guidance'>アカウントを作成</h1>
                            <form className="top-form">
                                <CustomInput ref={usernameRef} label="ユーザーネーム" type="text" placeholder="ユーザーネームを入力" />
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

            <div className='top-container-left-area'>
                <img src={appLogo} alt='linne' className='top-linne-icon' />
            </div>
            <div className='top-container-right-area'>
                <div className='top-select-access-method'>
                    <h2 className='top-welcome-message'>linneで日常を<br />メッセージしよう！</h2>
                    <p className='top-solicitation-message'>さあ、みんなと日常を共有だ。</p>
                    <div className='top-participation-button'>
                        <Link to="/login" className='top-login-button'><span>ログイン</span></Link>
                        <a className='top-register-button' onClick={openModal}><span>新規登録</span></a>
                    </div>
                    <p className='top-attention-message'>アカウントを登録することにより、<Link to="">利用規約</Link>と<Link to="">プライバシーポリシー（Cookieの使用を含む）</Link>に同意したとみなされます。</p>
                </div>
            </div>
        </div>
    );
};

export default Top;