/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useParams, useLocation } from 'react-router';

import { renderProseMirrorContent } from "@/lib/renderProseMirror";

export const Entity: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const entity = location.state;

    // console.log('Entity data:', entity);

    let parsedDescription: any = null;
    if (entity?.abstract) {
      try {
        parsedDescription = JSON.parse(entity.abstract);
        console.log("Parsed description:", parsedDescription);
      } catch (error) {
        console.error("Failed to parse description:", error);
      }
    }

    return (
        <div className="flex flex-col w-full h-full max-sm:px-4">
            <div className="flex flex-col w-auto h-screen">
                <h1 className="text-xl text-black font-black mb-2">
                    {entity?.title || 'Entity'}
                </h1>
                <p>
                    <span className="text-black font-black">Entity ID:</span> {id}
                </p>
                <br />
                <p className="text-black">
                    {parsedDescription
                        ? renderProseMirrorContent(parsedDescription)
                        : 'Lorem ipsum dolor sit amet consectetur.'}
                </p>
               
            </div>
        </div>
    );
};
