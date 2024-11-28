import { useEffect, useState } from 'react';
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

import Joyride from 'react-joyride';


const steps = [
  {
    target: '.my-first-step',
    content: 'Use this fantastic search input to find stuff. ',
  },
  {
    target: '.my-other-step',
    content: 'Check this out!! This is the second Feature highlight. ',
  },
];

const Home = () => {
  const [run, setRun] = useState(false);

  const handleClickStart = () => {
    setRun(true);
  };

  return (
    <div>
      <Joyride
        run={run}
        steps={steps}
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            backgroundColor: '#e3ffeb',
            overlayColor: 'rgba(79, 26, 0, 0.4)',
            primaryColor: '#000',
            textColor: '#004a14',
            width: 900,
            zIndex: 1000,
          },
        }}
      />
      <button onClick={handleClickStart}>Start</button>

      {/* <CountBtn /> */}
      <div className="my-first-step">
        <SortableTable />
      </div>
      <div className="w-full flex gap-10 p-6 my-other-step">
        <div className="w-1/2">
          <DataChart />
        </div>
        <div className="w-1/2">
          <SearchProgress />
        </div>
      </div>
    </div>
  );
};

// Main App component with route transitions applied to the entire route structure
function App() {
  const location = useLocation();


  // useEffect(() => {
  //   console.log('run', run);
  // },[run])

  return (
    <>
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
    </>

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