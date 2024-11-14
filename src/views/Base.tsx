import { useGetMyRecentActivityQuery } from '../services/activity/activity';
import { Link, MoreHorizontal, SquareArrowOutUpRight, ScanEye, Network, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const Base = () => {

    const { data: activityData } = useGetMyRecentActivityQuery();
    const navigate = useNavigate();

    const handleNavigateToEntities = (type:string, id:string) => {
        let redirRoute; 
        if(type == 'Entity'){
            redirRoute = 'entities'; 
        } else {
            redirRoute = 'studies'; 
        }; 
        navigate(`/library/${redirRoute}/${id}`, { state: { id } });
    };



    console.log('data', activityData);
    return(
        <div className="flex flex-col w-full h-screen max-sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* TODO: add dynamic units later */}
    
            <div  className="flex flex-col space-y-3 w-full max-sm:px-4 overflow-y-scroll">
                <h2 className='font-black text-lg items-start'>Pick up where you left off...</h2>
                <div className="flex flex-col items-start justify-start h-[350px] w-full rounded-xl gap-2">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {activityData && activityData.map((activity:any, idx:string) => (
                        <div key={idx} className="flex flex-col items-start w-full max-sm:px-4 bg-green-50 rounded-md p-4 cursor-pointer shadow-md" onClick={() => handleNavigateToEntities(activity.type, activity.id)}>
                            <p className="flex gap-2 text-sm items-center"><Link size={'12px'} /> {activity.type}</p>
                            <div className='flex justify-between w-full items-center'>
                            <h3 className="font-black">{activity.name}</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="rotated" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><SquareArrowOutUpRight /> Open Page</DropdownMenuItem>
                                    <DropdownMenuItem><ScanEye /> Open Preview</DropdownMenuItem>
                                    <DropdownMenuItem><Network /> Open in Tree View</DropdownMenuItem>
                                    <DropdownMenuItem><List /> Open in List View</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                    </div>
            
            </div>
    
            <div  className="flex flex-col space-y-3 w-full max-sm:px-4">
                <h2 className='font-black text-lg items-start'>Relations Graph</h2>
                <div className="flex items-center justify-center  animate-pulse bg-muted h-[350px] w-full rounded-xl">
                <h3 className="text-white">Panel</h3> 
                </div>
            </div>
    
            <div  className="flex flex-col space-y-3 w-full max-sm:px-4">
                <h2 className='font-black text-lg items-start'>What's happening at Findest</h2>
                <div className="flex flex-col items-start justify-start h-[350px] w-full rounded-xl gap-2">
                
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex flex-row items-start w-full max-sm:px-4 bg-green-200 rounded-md p-4">
                            <Link />
                            <p>An item of text and content</p>
                        </div>
                    ))}
                    </div>
            
            </div>
    
            <div  className="flex flex-col space-y-3 w-full max-sm:px-4">
                <h2 className='font-black text-lg items-start'>Page Type Breakdown</h2>
                <div className="flex items-center justify-center animate-pulse bg-muted h-[350px] w-full rounded-xl">
                <h3 className="text-white">Panel</h3> 
                </div>
            </div>
        
        </div>
        </div>
    );
};