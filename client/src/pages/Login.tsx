import React from 'react';
import FormField from '../components/FormField';
import { useLogin } from '../hooks/useLogin';
import '../style/login.css';

// Login コンポーネントは、ユーザーがログインできるフォームを提供します。
// 状態管理とロジックは useLogin フックに委譲しています。
const Login: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleLogin
  } = useLogin();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <FormField
          id="username"
          label="Username:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <FormField
          id="password"
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;