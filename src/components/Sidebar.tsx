import { Link, useParams } from 'react-router-dom';
import { getProject, getDocCategories, getDocsByCategory } from '@/data/projects';
import { useSidebarStore } from '@/stores/sidebarStore';

export default function Sidebar() {
  const { project: projectId, slug } = useParams();
  const project = projectId ? getProject(projectId) : null;
  const setSidebarOpen = useSidebarStore((s) => s.setOpen);

  if (!project) return null;

  const categories = getDocCategories(project.docs);

  return (
    <aside className="gm-sidebar">
      {categories.map((category) => (
        <div key={category} className="gm-sidebar-section">
          <div className="gm-sidebar-heading">{category}</div>
          {getDocsByCategory(project.docs, category).map((doc) => (
            <Link
              key={doc.slug}
              to={`/${project.id}/${doc.slug}`}
              className={`gm-sidebar-item ${slug === doc.slug ? 'gm-sidebar-item-active' : ''}`}
              style={{ textDecoration: 'none' }}
              onClick={() => setSidebarOpen(false)}
            >
              {doc.title}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
