import { Filter } from "lucide-react"


import { DocumentIndex } from "@/components/document-index";
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const Documents = () => (

    
    <div className="flex flex-col w-full h-ful max-sm:px-4">
        <div className="flex w-full justify-between items-center">
            <h1 className="text-black font-black text-xl">Documents</h1>
            <div className="flex">
            <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray p-4 rounded-md flex w-full"><Filter /> Add Filter</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Doc Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Science</DropdownMenuItem>
                    <DropdownMenuItem>Patent</DropdownMenuItem>
                    <DropdownMenuItem>Webpage</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ListPagination />   
            </div>  
        </div>
        <DocumentIndex />
        <div className="py-4 w-full">
            <ListPagination />     
        </div>  
    </div>
);
  