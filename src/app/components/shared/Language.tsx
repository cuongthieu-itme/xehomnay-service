import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Language() {
  return (
    <div className="text-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-medium text-white md:text-gray-600 cursor-pointer">
          En
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem className="text-lg font-medium text-gray-600  cursor-pointer">
            Me
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
