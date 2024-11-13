import { useGetSavedDocumentsQuery } from '../services/documents/document';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ListPagination } from "@/components/list-pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader, Filter } from 'lucide-react';

export const Documents = () => {
    const { data, isLoading, isError, error } = useGetSavedDocumentsQuery();


    return (
        <div className="w-full mx-auto max-sm:px-4">
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
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Saved Documents
                    {isLoading && <Loader className="animate-spin" />}
                </CardTitle>
            </CardHeader>

            <CardContent>
                {isError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-md">
                        Error loading documents: {JSON.stringify(error)}
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8">
                        <Loader className="animate-spin mx-auto mb-2" />
                        <p>Loading documents...</p>
                    </div>
                )}

                {data && (
                    <div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Total Documents: {data?.documents?.length}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {data.documents?.map((doc) => (
                                <Card key={doc.id} className="p-4">
                                    <a href={`/library/documents/${doc.id}`}>
                                    <div>
                                        <h3 className="font-medium">{doc.title}</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                            <div>
                                                <span className="text-gray-600">Type: </span>
                                                {doc.type}
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Added: </span>
                                                {new Date(doc.dateAdded).toLocaleDateString()}
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-gray-600">URL: </span>
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline">
                                                    {doc.url}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    </a>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* State Demonstration */}
                <Card className="mt-6 bg-gray-50">
                    <CardHeader>
                        <CardTitle className="text-sm text-black">API State</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-xs text-slate-500">
                            {JSON.stringify({
                                isLoading,
                                isError,
                                documentCount: data?.documents?.length || 0,
                                totalDocuments: data?.total || 0
                            }, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            </CardContent>
        </div>
    );
};

export default Documents;