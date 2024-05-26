// client/src/hooks/useLogin.ts

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUser } from './authService';

const useLogin = () => {
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

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleSubmit
  };
};

export default useLogin;
