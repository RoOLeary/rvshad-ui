import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";

export function EntityCard() {
  
  const [selectedDocs, setSelectedDocs] = useState(new Set());
  const handleSelectDoc = (docId: unknown, checked: string | boolean) => {
    const newSelected = new Set(selectedDocs);
    if (checked) {
      newSelected.add(docId);
    } else {
      newSelected.delete(docId);
    }
    setSelectedDocs(newSelected);
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="pt-4">
        <Checkbox
          id={`doc-1`}
          checked={selectedDocs.has(1)}
          onCheckedChange={(checked) => handleSelectDoc(1, checked)}
        />
      </div>
      <Card className="w-full bg-slate-100">
        <CardHeader>
          <CardTitle className="text-black">Entity Title</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <p className="text-black">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, dolorem magni. Non maxime veritatis ab, doloremque illo itaque, ullam placeat tempora enim, tenetur distinctio harum facere labore illum! Illum facere architecto facilis molestiae rerum similique ipsum eum reprehenderit? Laboriosam nulla pariatur facere veritatis. Qui eaque accusantium aperiam dignissimos maiores neque aspernatur recusandae, facere voluptate, tenetur vero ducimus reprehenderit, pariatur nihil.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-end gap-2">
          <Button variant="outline">Link</Button>
          <Button variant="default">Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
