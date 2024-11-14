import { useGetEntitiesQuery } from '../services/entities/entity';
import { Link, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const Base = () => {

    const { data: entityData } = useGetEntitiesQuery();
    const navigate = useNavigate();

    const handleNavigateToEntities = (id) => {
        // Navigate to the document view and pass the document data
        console.log('nav clicked');
        navigate(`/library/entities/${id}`, { state: { id } });
    };



    console.log('data', entityData);
    return(
        <div className="flex flex-col w-full h-screen max-sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* TODO: add dynamic units later */}
    
            <div  className="flex flex-col space-y-3 w-full max-sm:px-4 overflow-y-scroll">
                <h2 className='font-black text-lg items-start'>Pick up where you left off</h2>
                <div className="flex flex-col items-start justify-start h-[350px] w-full rounded-xl gap-2">
                
                    {entityData?.entities && entityData?.entities.map((entity, id) => (
                        <div key={entity.id} className="flex flex-col items-start w-full max-sm:px-4 bg-green-50 rounded-md p-2 cursor-pointer" onClick={() => handleNavigateToEntities(entity.id)}>
                            <p className="flex gap-2"><Link /> Entity</p>
                            <div className='flex justify-between w-full items-center'>
                            <h3 className="font-black">{entity.title}</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="rotated" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Open Page</DropdownMenuItem>
                                    <DropdownMenuItem>Open Preview</DropdownMenuItem>
                                    <DropdownMenuItem>Open in Tree View</DropdownMenuItem>
                                    <DropdownMenuItem>Open in List View</DropdownMenuItem>
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