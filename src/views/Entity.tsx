import { useParams, useLocation } from 'react-router';
import { EntityData } from '../types/types'; // Create a type for document data if needed for TypeScript
// import { extractTextContent } from '../lib/utils';

export const Entity: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const entity = location.state as EntityData;

    console.log('entity data', entity);
    return(
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2"> {entity?.title || "Entity"}</h1>
                <p><span className="text-black font-black">Entity ID:</span> {id}</p>
                <br/>
                <p className="text-black">{entity?.description ? entity.description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quisquam eligendi tenetur placeat nostrum laborum reiciendis praesentium est, quam rem cupiditate eaque maiores? Voluptatibus possimus necessitatibus cupiditate alias omnis porro, cumque fugiat dolore inventore blanditiis quibusdam nemo, fuga commodi quae. Cum incidunt corporis praesentium. Aut ullam libero repellendus architecto reiciendis. Quidem ullam temporibus debitis magni iste animi, hic ipsa perferendis numquam iusto dolorum reprehenderit, accusamus doloribus in velit, vero modi voluptate suscipit. Similique, aliquam! Quo nostrum vitae debitis consequuntur aliquid facere itaque, recusandae pariatur dicta aut nisi, in, perspiciatis saepe provident sint. Modi ullam placeat reiciendis delectus eligendi mollitia, rerum iusto vero vel? Repellat voluptatibus sunt ullam omnis totam porro suscipit quos accusantium maiores culpa placeat officia error vero distinctio eum, quisquam consectetur quia minus velit eaque laudantium quae? Fugiat dolor sequi harum? Mollitia sint at omnis fugit odio quisquam dolores numquam corporis enim autem, quam eius recusandae quia placeat libero ullam dolore ex ut eligendi eos et. Laborum consequuntur suscipit corrupti saepe dicta consequatur eaque quaerat distinctio vel debitis natus assumenda sequi consectetur delectus officia incidunt est rerum facilis, magni sapiente dignissimos? Dolor porro odit unde totam modi sunt quas expedita, tenetur minus, omnis quis impedit temporibus ducimus earum!'}</p>
            </div>
        </div>
    )
};
  
