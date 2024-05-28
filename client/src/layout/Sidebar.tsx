import React from 'react';
import { Link } from 'react-router-dom';
import '../style/app.css'; 

const Sidebar: React.FC = () => {
  return (
    <aside style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
