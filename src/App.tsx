import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider as ReduxStoreProvider } from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { HistoryRouter as Router } from 'redux-first-history/rr6';
import SearchProgress from "@/components/search-progress";
import { SortableTable } from '@/components/data-table/sortable-table';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "./components/dashboard-header";
import DataChart from "./components/data-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Document } from './views/Document';
import { Documents } from './views/Documents';
import { Studies } from './views/Studies';
import { Entities } from './views/Entities';
import { Entity } from './views/Entity';
import { NotFoundPage } from './views/NotFound';
import { store } from "./store";
import { useGetProfileQuery } from "./services/auth/auth"

// Define route components
const Base = () => (
  <div className="flex flex-col items-center justify-start w-full h-screen max-sm:px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-3 items-center w-full max-sm:px-4">
          <Skeleton className="h-[250px] w-[500px] rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

const Home = () => (
  <div className="flex flex-col gap-y-4 w-full h-screen">
 
    {/* <CountBtn /> */}
    <SortableTable />
    <div className="w-full flex gap-10 p-6">
      <div className="w-1/2">
        <DataChart />
      </div>
      <div className="w-1/2">
        <SearchProgress />
      </div>
    </div>
  </div>
);

const Queries = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <h2>Queries Page</h2>
  </div>
);



// Main App component with route transitions applied to the entire route structure
function App() {
  const location = useLocation();
  // const queryVar = useGetProfileQuery();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="app-canvas w-full">
        <DashboardHeader />
        <main className="flex flex-col items-center justify-start w-full h-full p-6">
          <SidebarTrigger className="absolute z-10 top-0 left-0" />
          <TransitionGroup component={null}>
            <CSSTransition 
              key={location.key} 
              classNames="fade" 
              timeout={1000} 
              unmountOnExit
            >
              <Routes location={location}>
                <Route path="/library/queries" element={<Queries />} />
                <Route path="/library/overview" element={<Documents />} />
                <Route path="/library/studies" element={<Studies />} />
                <Route path="/library/studies/:id" element={<Document />} />
                <Route path="/library/documents" element={<Documents />} />
                <Route path="/library/documents/:id" element={<Document />} />
                <Route path="/library/entities" element={<Entities />} />
                <Route path="/library/entities/:id" element={<Entity />} />
                <Route path="/all-components" element={<Base />} />
                <Route path="/inbox" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>
    </SidebarProvider>
  );
}

// Top-level wrapper
function AppWrapper() {
  return (
    <ReduxStoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxStoreProvider>
  );
}

export default AppWrapper;