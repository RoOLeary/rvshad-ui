import { useParams, useLocation } from 'react-router';
import { DocumentData } from '../types/types'; // Create a type for document data if needed for TypeScript



export const Document: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const document = location.state as DocumentData;

    // Render the full document data if available
    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2"> {document?.title || "Document"}</h1>
                <p><span className="text-black font-black">Document ID:</span> {id}</p>
                <p><span className="text-black font-black">Type: </span> {document?.type || "Document"}</p>
                <br/>
                <p className="text-black">{document?.abstract}</p>
            </div>
        </div>
    );
};
