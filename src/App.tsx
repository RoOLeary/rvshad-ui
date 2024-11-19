import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider as ReduxStoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SearchProgress from "@/components/search-progress";
import { SortableTable } from '@/components/data-table/sortable-table';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "./components/dashboard-header";
import DataChart from "./components/data-chart";
import { Base } from './views/Base';
import { Document } from './views/Document';
import { Documents } from './views/Documents';
import { Queries } from './views/Queries';
import { Studies } from './views/Studies';
import { Entities } from './views/Entities';
import { Entity } from './views/Entity';
import { NotFoundPage } from './views/NotFound';
import { store, persistor } from "./store";
import { Study } from './views/Study';

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

// Main App component with route transitions applied to the entire route structure
function App() {
  const location = useLocation();

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
                <Route path="/library/studies/:id" element={<Study />} />
                <Route path="/library/documents" element={<Documents />} />
                <Route path="/library/documents/:id" element={<Document />} />
                <Route path="/library/entities" element={<Entities />} />
                <Route path="/library/entities/:id" element={<Entity />} />
                <Route path="/all-components" element={<Base />} />
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

// Top-level wrapper
function AppWrapper() {
  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter future={{
            v7_startTransition: true,
          }}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ReduxStoreProvider>
  );
}

export default AppWrapper;