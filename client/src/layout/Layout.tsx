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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: '1' }}>
        <Sidebar />
        <main style={{ flex: '1'}}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
