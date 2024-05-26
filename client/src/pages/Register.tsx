import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/register.css';

const Register: React.FC = () => {
  // フォームフィールドの状態を保持する状態変数
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  // フォーム送信時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのフォーム送信動作を防止
  
    try {
      // サーバーにPOSTリクエストを送信
      const response = await fetch('http://localhost:5002/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          full_name: fullName,
          bio,
          location,
          website,
          birth_date: birthDate,
        }),
      });
  
      // レスポンスのステータスコードが201の場合、登録成功とみなす
      if (response.status === 201) {
        setMessage('登録が成功しました。');
        navigate('/home'); // ホームページにリダイレクト
      }
    } catch (error) {
      // エラーハンドリング
      setMessage('エラーが発生しました。担当者に連絡してください。');
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* 各入力フィールド */}
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="birth_date">Birth Date:</label>
          <input
            type="date"
            id="birth_date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;
