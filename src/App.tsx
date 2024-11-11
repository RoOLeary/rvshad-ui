import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import CountBtn from "@/components/count-btn";
import { Badge } from "@/components/ui/badge";
import SearchProgress from "@/components/search-progress";
import { ContentCarousel } from "@/components/content-carousel";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "./components/dashboard-header";

interface RouteWrapperProps<T> {
  children: React.ReactElement<T>;
}


// Define your route components
const Home = () => (
  <div className="flex flex-col items-center gap-y-4 w-full h-screen">
    <div className="inline-flex items-center gap-x-4">
      <h3>Findest</h3>
    </div>
    <a
      href="https://docs.findest.com"
      rel="noopener noreferrer nofollow"
      target="_blank"
    >
      <Badge variant="default">Findest Design System/ui</Badge>
    </a>
    <CountBtn />
    <ContentCarousel />
    <SearchProgress />
  </div>
);

const About = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <h2>About Page</h2>
    {/* Add your About page content here */}
  </div>
);

const Queries = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <h2>Queries Page</h2>
    {/* Add your About page content here */}
  </div>
);

const RouteWrapper = <T extends React.ReactNode>({ children }: RouteWrapperProps<T>) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        navigate(location.pathname, { replace: true });
      });
    } else {
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        
        <div className="app-canvas w-full">
          <DashboardHeader /> 
          <main className="flex flex-col items-center justify-center w-full h-screen p-6">    
            <SidebarTrigger className="absolute z-10 top-0 left-0"/>  
            <Routes>
              <Route
                path="/queries"
                element={
                  <RouteWrapper>
                    <Queries />
                  </RouteWrapper>
                }
              />
              <Route
                path="/library/overview"
                element={
                  <RouteWrapper>
                    <About />
                  </RouteWrapper>
                }
              />
              <Route
                path="/inbox"
                element={
                  <RouteWrapper>
                    <Home />
                  </RouteWrapper>
                }
              />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </Router>
  );
}

export default App;
