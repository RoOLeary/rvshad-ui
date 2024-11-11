import CountBtn from "@/components/count-btn";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import SearchProgress from "@/components/search-progress";
import { ContentCarousel } from "@/components/content-carousel";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "./components/dashboard-header";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="app-canvas w-full">
      <DashboardHeader />
      <main className="flex flex-col items-center justify-center w-full h-screen">
        
        <div className="flex flex-col items-center gap-y-4  w-full h-screen">
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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>  
          <ContentCarousel />
          <SearchProgress />
        </div>
      </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
