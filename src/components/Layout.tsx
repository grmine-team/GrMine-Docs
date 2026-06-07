import { Outlet, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SearchDialog from './SearchDialog';
import { useSidebarStore } from '@/stores/sidebarStore';
import { getProject } from '@/data/projects';

export default function Layout() {
  const { project: projectId } = useParams();
  const hasSidebar = !!projectId && !!getProject(projectId);
  const sidebarOpen = useSidebarStore((s) => s.isOpen);
  const setSidebarOpen = useSidebarStore((s) => s.setOpen);

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        {hasSidebar && (
          <div className="sidebar-wrapper" data-open={sidebarOpen}>
            <Sidebar />
          </div>
        )}
        {hasSidebar && sidebarOpen && (
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
