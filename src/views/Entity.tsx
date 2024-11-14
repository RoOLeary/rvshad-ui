import { useParams, useLocation } from 'react-router';
import { EntityData } from '../types/types'; // Create a type for document data if needed for TypeScript
// import { extractTextContent } from '../lib/utils';

export const Entity: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const entity = location.state as EntityData;

    // console.log(typeof(entity.description));
    return(
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2"> {entity?.title || "Entity"}</h1>
                <p><span className="text-black font-black">Entity ID:</span> {id}</p>
                <br/>
                <p className="text-black">{entity.description}</p>
            </div>
        </div>
    )
};
  