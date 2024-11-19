import { useParams } from 'react-router';
// import { DocumentData } from '../types/types'; // Create a type for document data if needed for TypeScript
import { useGetDocumentByIdQuery } from '@/services/documents/document';

export const Document: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const location = useLocation();
    // const document = location.state as DocumentData;

    // @ts-nocheck abd
    const { data: fetchedDocument } = useGetDocumentByIdQuery(id, {
      refetchOnMountOrArgChange: false, // Prevents automatic refetching
    });

    console.log('fetched', fetchedDocument?.connectedObjects);

    // console.log(typeof(fetchedDocument?.connectedObjects));

    const renderConnectedObjects = fetchedDocument && Object.entries(fetchedDocument?.connectedObjects).map((o, i) => {
      return <div key={i}>Connected Object: {o[1]?.name}</div>;
    });

    // Render the full document data if available
    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2"> {fetchedDocument?.title || "Document"}</h1>
                <p><span className="text-black font-black">Document ID:</span> {id}</p>
                <p><span className="text-black font-black">Type: </span> {fetchedDocument?.type || "Document"}</p>
                <br/>
                <p className="text-black">{fetchedDocument?.abstract}</p>
                <br />
                <h4 className='font-black'>Connected Objects:</h4>
                
                <p>
                  <a href={fetchedDocument?.connectedObjects[0].url}>{fetchedDocument?.connectedObjects[0].name}</a>
                </p>

                {renderConnectedObjects}
            </div>
        </div>
    );
};
