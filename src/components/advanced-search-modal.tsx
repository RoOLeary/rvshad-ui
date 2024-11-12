import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";

const AdvancedSearchModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Advanced Search</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Advanced Search</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <iframe 
            src="/queries"
            className="w-full h-full border-none"
            title="Advanced Search"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchModal;