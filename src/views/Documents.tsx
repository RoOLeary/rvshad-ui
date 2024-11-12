// import { DocumentCard } from "@/components/document-card";
import { DocumentIndex } from "@/components/document-index";
import { ListPagination } from "@/components/list-pagination";
  

export const Documents = () => (

    
    <div className="flex flex-col w-full h-ful max-sm:px-4">
        <h1 className="text-black font-black text-xl pb-8 pl-0">Documents</h1>
        <DocumentIndex />
        <div className="py-4 w-full">
            <ListPagination />     
        </div>  
    </div>
);
  