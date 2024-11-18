// import { Filter } from "lucide-react"


// import { DocumentIndex } from "@/components/document-index";
// import { ListPagination } from "@/components/list-pagination";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"

// export const Studies = () => (

    
//     <div className="flex flex-col w-full h-ful max-sm:px-4">
//         <div className="flex w-full justify-between items-center">
//             <h1 className="text-black font-black text-xl">Studies</h1>
//             <div className="flex">
//             <DropdownMenu>
//                 <DropdownMenuTrigger className="bg-gray p-4 rounded-md flex w-full"><Filter /> Add Filter</DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                     <DropdownMenuLabel>Study Type</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>Science</DropdownMenuItem>
//                     <DropdownMenuItem>Patent</DropdownMenuItem>
//                     <DropdownMenuItem>Webpage</DropdownMenuItem>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//             <ListPagination />   
//             </div>  
//         </div>
//         <DocumentIndex />
//         <div className="py-4 w-full">
//             <ListPagination />     
//         </div>  
//     </div>
// );

// export default Studies;



/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useGetStudiesQuery } from '../services/study/study';
import { Filter, Loader } from "lucide-react";
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EntityCard } from '@/components/entity-card';
import { Checkbox } from "@/components/ui/checkbox";

 

export const Studies: React.FC = () => {
    const [selectedStudies, setSelectedStudies] = useState<Set<string>>(new Set());
    const [hasCachedData, setHasCachedData] = useState(false);

    // Use RTK Query hook to fetch entities from API
    const { data: studyData, isLoading, isError, error } = useGetStudiesQuery(
        undefined, {
            refetchOnMountOrArgChange: false, // Prevents automatic refetching
    });
    
    useEffect(() => {
        // Set hasCachedData to true if data is initially fetched
        if (studyData) {
            setHasCachedData(true);
        }
    }, [studyData]);

    // Handle select all documents
    const handleSelectAll = (checked: boolean) => {
        if (checked && studyData) {
            // @ts-nocheck abc
            setSelectedStudies(new Set(studyData?.studies?.map((study: { id: any; }) => study.id)));
        } else {
          setSelectedStudies(new Set());
        }
    };

    // Handle individual document selection
    const handleSelectStudy = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedStudies);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedStudies(newSelected);
    };



    // console.log('entities', entityData); 

    // Render loading, error, or data states
    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-black font-black text-xl">Studies</h1>
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-gray p-4 rounded-md flex w-full">
                            <Filter /> Add Filter
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Basic Study Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Basic</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ideation</DropdownMenuItem>
                            <DropdownMenuItem>Literature Study</DropdownMenuItem>
                            <DropdownMenuItem>Technology Scouting</DropdownMenuItem>
                            <DropdownMenuItem>Experimental Study</DropdownMenuItem>
                            <DropdownMenuItem>Characterization</DropdownMenuItem>
                            <DropdownMenuItem>Chemical</DropdownMenuItem>
                            <DropdownMenuItem>Feasibility Study</DropdownMenuItem>
                            <DropdownMenuItem>Market Research</DropdownMenuItem>
                            <DropdownMenuItem>Troubleshooting</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Other Study Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Study</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Study Status</DropdownMenuLabel>
                            <DropdownMenuItem>New</DropdownMenuItem>
                            <DropdownMenuItem>Active</DropdownMenuItem>
                            <DropdownMenuItem>Closed</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Started By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ro</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ListPagination />
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg mb-4">
                <Checkbox
                    id="select-all"
                    checked={studyData ? selectedStudies.size === studyData?.studies?.length : false}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <label 
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select All Documents ({selectedStudies.size} of {studyData?.studies?.length || 0} selected)
                </label>
            </div>
                {/* Render loading, error, or data states */}
                {isError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-md">
                        Error loading studies: {JSON.stringify(error)}
                    </div>
                )}

                {isLoading && !hasCachedData && ( // Show spinner only if loading and no cached data is available
                    <div className="text-center py-8">
                        <Loader className="animate-spin mx-auto mb-2" />
                        <p>Loading studies...</p>
                    </div>
                )}

                {studyData?.studies && studyData.studies.length > 0 && (
                    <div className="p-4">
                        {studyData.studies.map((study) => (
                            <EntityCard
                                key={study.id}
                                {...study}
                                isSelected={selectedStudies.has(study.id)}
                                onSelect={handleSelectStudy} />
                        ))}
                    </div>
                )}
            
            <div className="py-4 w-full">
                <ListPagination />
            </div>
        </div>
    );
};
