import { Clock, Pin, ChartNetwork, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
interface DashboardHeader {
  className?: string;
}

export default function DashboardHeader() {

  return (
    <header className="flex flex-col gap-6 md:flex-row items-center justify-between bg-gray-150 p-6 w-full bg-gray-300 sticky top-0 z-10">
        <div className="control-buttons">
            <ul className="flex gap-2">
                <li>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button title="Recent Activity"><Clock width={18} color="black" /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Recent Activity</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li> 
                <li>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button title="Pinned"><Pin width={18} color="black"/></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Pinned</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li> 
                <li>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button title="Network Explorer"><ChartNetwork width={18} color="black"/></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Network Explorer</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li> 
                   
                <li>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button title="No active queries"><Search width={18} color="black"/></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>No active queries</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li> 
            </ul>
        </div>
       
            
        <div className="header-searchform">
            <form className="relative min-w-[420px]">
                <input
                type="text"
                placeholder="Search the Universe"
                className="min-w-[420px] p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>
   
            

        </div>

        <div className="create-action">
            <Button variant="secondary">Create New</Button>
        </div>
    </header>
  );
}
