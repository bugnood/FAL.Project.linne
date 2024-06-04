import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Top from './pages/Top';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Layout from '../src/layout/Layout';
import Timeline from './pages/Timeline';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timeline" element={<Layout><Timeline /></Layout>} />
        <Route path="/create-post" element={<Layout><CreatePost /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;