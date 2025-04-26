import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

function Layout({ username, onLogout }) {
  return (
    <div className="layout">
      <Navbar username={username} onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
