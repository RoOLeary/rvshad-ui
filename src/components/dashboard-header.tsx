// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '../services/auth/authSlice';

import { Clock, Pin, ChartNetwork, Search, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { useWebSocket } from '../hooks/use-web-socket';
// import { Permission, usePermissionsChecker } from '../hooks/use-permissions-checker';

interface DashboardHeader {
    className?: string;
}

export default function DashboardHeader() {
    
    const user = useSelector(currentUser);


    const { isConnected, sendMessage, lastMessage } = useWebSocket('ws://localhost:4000/chat', {
        reconnect: true,
        reconnectInterval: 3000,
        onOpen: () => console.log('Connected to WebSocket'),
        onMessage: (event) => console.log('New message received:', event.data),
        onClose: () => console.log('Disconnected from WebSocket'),
      });

    // console.log('from websocket hook', isConnected)
    // console.log('sendMessage websocket hook', sendMessage)

    return (
        <header className="flex flex-col gap-6 md:flex-row items-center justify-between bg-gray-150 p-6 w-full bg-gray-300 sticky top-0 z-10">
            {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> */}
            <div className="control-buttons">
                <ul className="flex gap-2">
                    <li>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button name="Recent"><Clock width={18} color="black" /></Button>
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
                                    <Button name="Pinned"><Pin width={18} color="black" /></Button>
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
                                    <Button name="Network Explorer"><ChartNetwork width={18} color="black" /></Button>
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
                                    <Button name="Active queries"><Search width={18} color="black" /></Button>
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
            <div className="flex items-center gap-2">
                {user ? <div className="flex items-center gap-2">
                        <h3>Welcome {user}</h3>
                        <Button variant="outline" className="text-white">Log Out</Button>
                </div> : <Button variant="outline" className="text-white">Log In</Button>}  
                <div className="create-action flex items-center gap-2">
                    <Button variant="secondary">Create New</Button>
                    <Button name="Happiness" className="hover:bg-slate-300 text-white"><SmilePlus width={18} color="black" /></Button>
                </div>
            </div>
        </header>
    );
}
