import { Filter } from "lucide-react"

import { EntityIndex } from "@/components/entity-index";
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const Entities = () => (

    <div className="flex flex-col w-full h-ful max-sm:px-4">
    <div className="flex w-full justify-between items-center">
        <h1 className="text-black font-black text-xl">Entities</h1>
        <div className="flex">
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray p-4 rounded-md flex w-full"><Filter /> Add Filter</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <ListPagination />   
        </div>  
    </div>
    <EntityIndex />
    <div className="py-4 w-full">
        <ListPagination />     
    </div>  
</div>
);