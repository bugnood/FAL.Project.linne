import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import '../style/login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    // ログイン処理
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/auth/login', { username, password });
            if (response.data.user) {
                setUser(response.data.user);
                navigate('/timeline');
            } else {
                // ログイン失敗の処理
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // エラーメッセージの処理
            } else {
                // エラーメッセージの処理
            }
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <form className='login-form' onSubmit={handleLogin}>
                    <h2 className='login-title'>ログイン</h2>
                    <p className='login-input-label'>ユーザ名</p>
                    <Input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <p className='login-input-label'>パスワード</p>
                    <p className='login-input-annotation'>パスワードは8文字以上で、大文字、小文字、数字、記号を含めて設定してください。</p>
                    <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button
                        label="ログイン"
                        style={{}}
                        className=""
                        icon={<i className="fas fa-check"></i>}
                        ariaLabel="Click Me Button"
                    />
                    <Link to={'/'} className='login-back-to-top'>TOP画面に戻る</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;