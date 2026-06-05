import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SearchDialog from './SearchDialog';
import { useSidebarStore } from '@/stores/sidebarStore';

export default function Layout() {
  const sidebarOpen = useSidebarStore((s) => s.isOpen);
  const setSidebarOpen = useSidebarStore((s) => s.setOpen);

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <div className="sidebar-wrapper" data-open={sidebarOpen}>
          <Sidebar />
        </div>
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
      <SearchDialog />
    </div>
  );
}
