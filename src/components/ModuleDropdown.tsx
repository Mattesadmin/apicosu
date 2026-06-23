import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function ModuleDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-md hover:bg-white/10 transition text-white">
        Module
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-black/90 backdrop-blur-xl border border-white/10 text-white">
        <DropdownMenuItem>
          <Link to="/error-finder" className="w-full">Error Finder</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/customizing-analyzer" className="w-full">Customizing Analyzer</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/transport-impact-analyzer" className="w-full">Transport Impact Analyzer</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/blueprint-generator" className="w-full">Blueprint Generator</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/testdata-generator" className="w-full">Test Data Generator</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/training-generator" className="w-full">Training Generator</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}