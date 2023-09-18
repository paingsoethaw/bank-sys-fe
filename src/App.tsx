import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Account from './pages/Account';
import Saving from './pages/Saving';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Account />} />
        <Route path="account" element={<Account />} />
        <Route path="saving" element={<Saving />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/saving">Saving</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}
