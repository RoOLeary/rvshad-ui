import { Clock, Pin, ChartNetwork, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeader {
  className?: string;
}

export default function DashboardHeader() {

  return (
    <header className="flex flex-col gap-6 md:flex-row items-center justify-between bg-gray-150 p-6 w-full bg-gray-300 sticky top-0">
        <div className="control-buttons">
            <ul className="flex gap-2">
                <li><Button text="Recent Activity" title="Recent Activity"><Clock width={18} color="black" /></Button></li>
                <li><Button text="Pinned" title="Pinned"><Pin width={18} color="black"/></Button></li>
                <li><Button text="Network Explorer" title="Network Explorer"><ChartNetwork width={18} color="black"/></Button></li>
                <li><Button text="No active queries" title="No active queries"><Search width={18} color="black"/></Button></li>
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
