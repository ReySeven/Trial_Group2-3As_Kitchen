import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const modules = import.meta.glob('./pages/*.jsx', { eager: true });

const ROUTES = {
  // Auth
  LoginPage:    '/login',
  RegisterPage: '/register',
  OtpPage:      '/otp',

  // Customer
  MenuPage:     '/menu',
  OrdersPage:   '/orders',
  FeedbackPage: '/feedback',

  // Admin
  AdminOrdersPage:   '/admin/orders',
  AdminProductsPage: '/admin/products',
  AdminPromosPage:   '/admin/promos',
  AdminRidersPage:   '/admin/riders',
  AdminReportsPage:  '/admin/reports',
  AdminFeedbackPage: '/admin/feedback',
  
  // Rider
  RiderPage:    '/rider',
};

const pages = Object.entries(ROUTES)
  .map(([name, path]) => ({ name, path, Page: modules[`./pages/${name}.jsx`]?.default }))
  .filter(p => p.Page);

const hasLogin = pages.some(p => p.name === 'LoginPage');

function Placeholder() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 32 }}>
      <h1>3A&apos;s Kitchen</h1>
      <p>The project foundation is running. No login page has been merged yet.</p>
      <p>Pages available right now:</p>
      <ul>
        {pages.length === 0 && <li>none yet</li>}
        {pages.map(p => <li key={p.name}><a href={p.path}>{p.path}</a></li>)}
      </ul>
    </div>
  );
}

function App() {
  const fallback = hasLogin ? <Navigate to="/login" replace /> : <Placeholder />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={fallback} />
        {pages.map(({ name, path, Page }) => (
          <Route key={name} path={path} element={<Page />} />
        ))}
        <Route path="*" element={fallback} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
