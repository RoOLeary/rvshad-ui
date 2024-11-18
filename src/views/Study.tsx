import { useParams, useLocation } from 'react-router';
import { EntityData } from '../types/types'; // Create a type for document data if needed for TypeScript

export const Study: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const study = location.state as EntityData;

    // Render the full study data if available
    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2"> {study?.title || "study"}</h1>
                <p><span className="text-black font-black">Study ID:</span> {id}</p>
                <p><span className="text-black font-black">Type: </span> {study?.type || "study"}</p>
                <br/>
                {/* <p className="text-black">{study?.abstract}</p> */}
            </div>
        </div>
    );
};
