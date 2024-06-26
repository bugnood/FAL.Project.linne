import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Top from './pages/Top';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Layout from '../src/layout/Layout';
import Timeline from './pages/Timeline';
import UserProfile from './pages/UserProfile';
import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/timeline" element={<Layout><Timeline /></Layout>} />
          <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;