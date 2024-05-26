// client/src/components/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUser } from '../services/loginLogic/authService';
import '../style/login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const message = await getLoginUser(username, password);
      setMessage(message);

      if (message === '成功') {
        navigate('/home');
      }
    } catch (error) {
      setMessage('エラーが発生しました。担当者に連絡してください。');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;