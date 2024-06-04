import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import '../style/register.css';

const Register: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ログイン処理
  const handleregister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/auth/register', { username, password });
      // setMessage(response.data.message);
      if (response != null) {
        navigate('/timeline');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // setMessage(error.response?.data.message || 'An error occurred');
      } else {
        // setMessage('An error occurred');
      }
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <form className='register-form' onSubmit={handleregister}>
          <h2 className='register-title'>新規登録</h2>
          <p className='register-input-label'>ユーザ名</p>
          <p></p>
          <Input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
          <p className='register-input-label'>パスワード</p>
          <p className='register-input-annotation'>パスワードは8文字以上で、大文字、小文字、数字、記号を含めて設定してください。</p>
          <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button
            label="新規登録"
            style={{}}
            className=""
            icon={<i className="fas fa-check"></i>}
            ariaLabel="Click Me Button"
          />
          <Link to={'/'} className='register-back-to-top'>TOP画面に戻る</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;