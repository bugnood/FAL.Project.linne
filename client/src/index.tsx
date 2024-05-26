import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // パフォーマンス計測用のreportWebVitalsモジュールをインポート

// ルートDOM要素を取得し、Reactアプリケーションのルートとして使用
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web Vitalsのレポートを記録するための関数を呼び出し
reportWebVitals();