import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DocumentCard() {
  return (
    <Card className="w-full bg-slate-100">
      <CardHeader>
        <CardTitle className="text-black">Document Title</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <p className="text-black">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos pariatur nam odio recusandae consequuntur! Voluptatum numquam reiciendis vitae sunt quos.</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-end gap-2">
        <Button variant="outline">Link</Button>
        <Button variant="default">Save</Button>
      </CardFooter>
    </Card>
  )
}
