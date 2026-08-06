import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <div className="relative w-120">
      <Search
        size={18}
        className="absolute left-2 top-2 text-slate-400"
      />

      <Input
        className="pl-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}