import { useGetEntitiesQuery } from '../services/entities/entity';
import { Filter } from "lucide-react";
import { EntityIndex } from "@/components/entity-index";
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Entities = () => {
    // Use RTK Query hook to fetch entities from API
    const { data: entityData, isLoading, isError, error } = useGetEntitiesQuery();

    console.log('entities', entityData); // Logs the full entity data structure

    // Render loading, error, or data states
    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-black font-black text-xl">Entities</h1>
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-gray p-4 rounded-md flex w-full">
                            <Filter /> Add Filter
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Custom Entity Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Basic</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Technology</DropdownMenuItem>
                            <DropdownMenuItem>Material</DropdownMenuItem>
                            <DropdownMenuItem>Process</DropdownMenuItem>
                            <DropdownMenuItem>Method</DropdownMenuItem>
                            <DropdownMenuItem>Ingredient</DropdownMenuItem>
                            <DropdownMenuItem>Chemical</DropdownMenuItem>
                            <DropdownMenuItem>Product</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Organisation</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Partner</DropdownMenuItem>
                            <DropdownMenuItem>Supplier</DropdownMenuItem>
                            <DropdownMenuItem>Competitor</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Other Entity Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Entity</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Started By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ro</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ListPagination />
                </div>
            </div>

            {/* Render loading, error, or data states */}
            {isLoading && <p>Loading entities...</p>}
            {isError && <p>Error loading entities: {error?.message}</p>}
            {entityData?.entities && entityData.entities.length > 0 && (
                <div>
                    {entityData.entities.map((entity) => (
                        <div key={entity.id} className="entity-item">
                            <h3>{entity.title}</h3>
                            {/* <p>{entity.abstract}</p> */}
                        </div>
                    ))}
                </div>
            )}

            <div className="py-4 w-full">
                <ListPagination />
            </div>
        </div>
    );
};
