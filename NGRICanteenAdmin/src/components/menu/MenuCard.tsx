import type { MenuItem } from "../../types/menu";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Pencil, Trash2, UtensilsCrossed } from "lucide-react";

interface Props {
  item: MenuItem;

  onEdit?: (item: MenuItem) => void;

  onDelete?: (item: MenuItem) => void;

  onToggleAvailability?: (item: MenuItem) => void;
}

export default function MenuCard({
  item,
  onEdit,
  onDelete,
  onToggleAvailability,
}: Props) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{item.itemName}</h3>
            <p className="text-sm text-slate-500">

{new Date(item.menuDate!).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })}

</p>
            <p className="text-gray-500 mt-2">
              {item.description || "No description"}
            </p>
          </div>
          <UtensilsCrossed className="text-cyan-600" size={28} />
        </div>
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-2xl font-bold text-cyan-600">₹ {item.price}</p>
            <Badge className="mt-2">{item.sessionType}</Badge>{" "}
            <Badge variant={item.isAvailable ? "default" : "destructive"}>
              {item.isAvailable ? "Available" : "Disabled"}
            </Badge>
          </div>
          {/* switch */}
          <Button
            variant="secondary"
            onClick={() => onToggleAvailability?.(item)}
          >
            {item.isAvailable ? "Disable" : "Enable"}
          </Button>
          {/* End of Switch */}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit?.(item)}
            >
              <Pencil size={18} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete?.(item)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
