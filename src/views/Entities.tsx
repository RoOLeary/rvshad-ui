// import { DocumentCard } from "@/components/document-card";
import { EntityIndex } from "@/components/entity-index";
import { ListPagination } from "@/components/list-pagination";
  

export const Entities = () => (

    
    <div className="flex flex-col w-full h-ful max-sm:px-4">
        <h1 className="text-black font-black text-xl pb-8 pl-0">Entities</h1>
        <EntityIndex />
        <div className="py-4 w-full">
            <ListPagination />     
        </div>  
    </div>
);
  