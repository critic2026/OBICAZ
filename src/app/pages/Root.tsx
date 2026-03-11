import { Outlet, useLocation } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UserProvider } from '../context/UserContext';

const FULLSCREEN_ROUTES = ['/', '/radar', '/auth'];

export function Root() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(location.pathname);

  return (
    <UserProvider>
      <div className={`flex flex-col bg-gray-50 ${isFullscreen ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
        {!isFullscreen && <Header />}
        <main className={`flex-1 relative flex flex-col ${isFullscreen ? 'overflow-hidden' : ''}`}>
          <Outlet />
          {!isFullscreen && <Footer />}
        </main>
      </div>
    </UserProvider>
  );
}