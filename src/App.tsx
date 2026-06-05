import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import DocPage from '@/pages/DocPage';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:project/:slug" element={<DocPage />} />
          <Route path="/:project" element={<DocPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
