import type { MenuHistory } from "../../types/menu";
import { Badge } from "../../components/ui/badge";

interface Props {
  history: MenuHistory[];
}

export default function MenuHistoryTable({
  history,
}: Props) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3">Date</th>

            <th className="text-left p-3">Session</th>

            <th className="text-center p-3">Items</th>

            <th className="text-center p-3">Status</th>

            <th className="text-left p-3">Menu Items</th>
          </tr>
        </thead>

        <tbody>
          {history.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center p-8"
              >
                No Menu History
              </td>
            </tr>
          ) : (
            history.map((group) => (
              <tr
                key={`${group.menuDate}-${group.sessionType}`}
                className="border-t"
              >
                <td className="p-3">
                  {new Date(group.menuDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>

                <td className="p-3">
                  <Badge>{group.sessionType}</Badge>
                </td>

                <td className="text-center">
                  {group.items.length}
                </td>

                <td className="text-center">
                  <Badge
                    variant={
                      group.isAvailable
                        ? "default"
                        : "destructive"
                    }
                  >
                    {group.isAvailable
                      ? "Available"
                      : "Disabled"}
                  </Badge>
                </td>

                <td className="p-3">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b py-1 last:border-0"
                    >
                      <span>{item.itemName}</span>

                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}