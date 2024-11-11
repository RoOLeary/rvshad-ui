import CountBtn from "@/components/count-btn";
import { Badge } from "@/components/ui/badge";
import SearchProgress from "@/components/search-progress";
import { ContentCarousel } from "@/components/content-carousel";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <div className="inline-flex items-center gap-x-4">
         <h3>Findest</h3>
        </div>
        <a
          href="https://docs.findest.com"
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          <Badge variant="outline">Findest Design System/ui</Badge>
        </a>
        <CountBtn />
        <ContentCarousel />
        <SearchProgress />
      </div>
    </main>
    </SidebarProvider>
  );
}

export default App;
