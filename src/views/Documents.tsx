import { useState, useEffect } from 'react';
import { useGetSavedDocumentsQuery } from '../services/documents/document';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { DocumentCard } from '@/components/document-card';
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, Filter } from 'lucide-react';

export const Documents: React.FC = () => {
    const { data, isLoading, isError, error } = useGetSavedDocumentsQuery(undefined, {
        refetchOnMountOrArgChange: false, // Prevents automatic refetching
    });

    const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
    const [hasCachedData, setHasCachedData] = useState(false);

    useEffect(() => {
        // Set hasCachedData to true if data is initially fetched
        if (data) {
            setHasCachedData(true);
        }
    }, [data]);

    // Handle select all documents
    const handleSelectAll = (checked: boolean) => {
        if (checked && data) {
            setSelectedDocs(new Set(data.documents.map((doc) => doc.id)));
        } else {
            setSelectedDocs(new Set());
        }
    };

    // Handle individual document selection
    const handleSelectDoc = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedDocs);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedDocs(newSelected);
    };

    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-black font-black text-xl">Documents</h1>
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-slate-50 mb-2 p-4 rounded-md flex w-full"><Filter /> Add Filter</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Doc Type</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Science</DropdownMenuItem>
                            <DropdownMenuItem>Patent</DropdownMenuItem>
                            <DropdownMenuItem>Webpage</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="hidden md:flex mb-2">
                        <ListPagination />   
                    </div>
                </div>  
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg mb-4">
                <Checkbox
                    id="select-all"
                    checked={data ? selectedDocs.size === data.documents.length : false}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <label 
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select All Documents ({selectedDocs.size} of {data?.documents?.length || 0} selected)
                </label>
            </div>

            <CardContent>
                {isError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-md">
                        Error loading documents: {JSON.stringify(error)}
                    </div>
                )}

                {isLoading && !hasCachedData && ( // Show spinner only if loading and no cached data is available
                    <div className="text-center py-8">
                        <Loader className="animate-spin mx-auto mb-2" />
                        <p>Loading documents...</p>
                    </div>
                )}

                {data && (
                    <div>
                        <div className="space-y-4">
                            {data.documents.map((doc) => (
                                <DocumentCard
                                    key={doc.id}
                                    {...doc}
                                    isSelected={selectedDocs.has(doc.id)}
                                    onSelect={handleSelectDoc}
                                />
                            ))}
                        </div>
                        <ListPagination />
                    </div>
                )}
            </CardContent>
        </div>
    );
};

export default Documents;
