import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpenCheck, Paperclip, Fingerprint, Image, Highlighter } from "lucide-react";

interface DocumentCardProps {
    id: string;
    url: string;
    title: string;
    type: string;
    abstract?: string;
    dateAdded?: string;
    isSelected: boolean;
    onSelect: (id: string, checked: boolean) => void;
    linkedCounts: [],
}


const typeIcons = {
  studyCount: BookOpenCheck,
  entityCount: Fingerprint,
  imageCount: Image,
  fileCount: Paperclip,
  highlightCount: Highlighter,
}



export const DocumentCard: React.FC<DocumentCardProps> = ({ id, url, title, type, abstract, dateAdded, isSelected, onSelect, linkedCounts }) => {
    const navigate = useNavigate();

    // console.log('linkedCounts:', linkedCounts)
    const handleCheckboxChange = (checked: boolean) => {
        onSelect(id, checked);
    };

    const handleCardClick = () => {
        // Navigate to the document view and pass the document data
        navigate(`/library/documents/${id}`, { state: { id, url, title, type, abstract, dateAdded } });
    };

    return (
        <div className="flex items-start space-x-4">
            <Checkbox
                id={`doc-${id}`}
                checked={isSelected}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean)}
                className="secondary"
            />
            <Card key={id} className="w-full bg-white text-black" onClick={handleCardClick}>
                <div className="p-4 cursor-pointer">
                    <h3 className="font-black text-lg text-black">{title}</h3>
                    <div className="flex flex-col mt-2 text-sm">
                        <div>
                            <span className="font-black text-black">Type: </span>
                            {type || "Webpage"}
                        </div>
                        <div>
                            <span className="font-black text-black">Added: </span>
                            {dateAdded ? new Date(dateAdded).toLocaleDateString() : "N/A"}
                        </div>
                        <div className="col-span-2">
                            <span className="font-black text-black">URL: </span>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {url}
                            </a>
                        </div>
                        {/* <div>
                            <span className="font-black text-black">: </span>
                            <p>{abstract ? abstract : "N/A"}</p>
                        </div> */}
                    </div>
                    <div>
                      <ul className="flex flex-row gap-2 mt-4">
                        {Object.entries(linkedCounts)
                          .filter(([, value]) => value > 0) // Only render if the count is greater than 0
                          .map(([key, value], idx) => {
                            const IconComponent = typeIcons[key]; // Get the corresponding icon
                            return (
                              <li
                                key={idx}
                                className="rounded-md bg-slate-100 text-black p-1 flex gap-2 items-center"
                                name={key}
                              >
                                {IconComponent && <IconComponent size={16} />} {/* Render icon if it exists */}
                                {value}
                              </li>
                            );
                        })}
                      </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};