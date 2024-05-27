import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUser } from '../services/loginLogic/authService';

// useLogin カスタムフックは、ログインに必要な状態管理とロジックを提供します。
// - username: ユーザー名の状態と更新関数
// - password: パスワードの状態と更新関数
// - message: ログインメッセージの状態
// - handleLogin: フォーム送信時にログインを処理する関数
export const useLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  // handleLogin 関数は、フォーム送信時に呼び出され、ログイン処理を行います。
  // 成功した場合、ホームページにリダイレクトし、失敗した場合はエラーメッセージを設定します。
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
    handleLogin
  };
};