import { Icons } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ChildSelectProps = {
  items: { id: number; name: string }[];
  onChange: (val: string) => void;
};
export const ChildSelect = ({ items, onChange }: ChildSelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="h-10 w-[180px]">
        <div className="flex items-center text-sm">
          <Icons.User className="mr-2.5" />
          <span className="text-[#696974]">Child:&nbsp;</span>
          <SelectValue placeholder="All" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All">All</SelectItem>
          {items.map((child) => (
            <SelectItem value={String(child.id)} key={child.id}>
              {child.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
