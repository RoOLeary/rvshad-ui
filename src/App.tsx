import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CountBtn from "@/components/count-btn";
import { Badge } from "@/components/ui/badge";
import SearchProgress from "@/components/search-progress";
import { ContentCarousel } from "@/components/content-carousel";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "./components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import React from 'react';

// Define route components
const Base = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3 items-center">
          <Skeleton className="h-[250px] w-[500px] rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

const Home = () => (
  <div className="flex flex-col items-center gap-y-4 w-full h-screen">
    <div className="inline-flex items-center gap-x-4">
      <h3>Findest</h3>
    </div>
    <a href="https://docs.findest.com" rel="noopener noreferrer nofollow" target="_blank">
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
  </div>
);

const Queries = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <h2>Queries Page</h2>
  </div>
);

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <h2>404!!</h2>
    <p>Nothing found. Check your query and try again.</p>
  </div>
);

// Main App component with route transitions applied to the entire route structure
function App() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="app-canvas w-full">
        <DashboardHeader />
        <main className="flex flex-col items-center justify-center w-full h-screen p-6">
          <SidebarTrigger className="absolute z-10 top-0 left-0" />

          <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={1000} unmountOnExit>
              <Routes location={location}>
                <Route path="/queries" element={<Queries />} />
                <Route path="/library/overview" element={<About />} />
                <Route path="/inbox" element={<Home />} />
                <Route path="/" element={<Base />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Top-level wrapper to provide Router context
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
