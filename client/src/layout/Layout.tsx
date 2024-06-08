import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../style/app.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='content'>
        <Sidebar />
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;