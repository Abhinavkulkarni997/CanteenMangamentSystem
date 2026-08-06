import { Utensils } from "lucide-react";

// interface MenuItem {
//   id: number;
//   itemName: string;
//   sessionType: "BREAKFAST" | "LUNCH" | "DINNER";
// }
interface MenuItem {
  id: number;
  itemName: string;
  sessionType: "LUNCH" | "DINNER";
}
interface Props {
  menu: MenuItem[];
}

export default function TodayMenu({ menu }: Props) {
  const grouped = {
    // BREAKFAST: menu.filter((m) => m.sessionType === "BREAKFAST"),
    LUNCH: menu.filter((m) => m.sessionType === "LUNCH"),
    DINNER: menu.filter((m) => m.sessionType === "DINNER"),
  };
  
  if (menu.length === 0) {
  return (
    <div className="rounded-xl border p-6 text-center text-gray-500">
      No menu available for today.
    </div>
  );
}

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Utensils className="h-5 w-5 text-cyan-600" />
        <h2 className="text-xl font-semibold">Today's Menu</h2>
      </div>

      
{/* {(["BREAKFAST",LUNCH", "DINNER"] as const).map((session) */}
      {([ "LUNCH", "DINNER"] as const).map((session) => (
        grouped[session].length > 0 && (
          <div key={session} className="mb-6">
            <h3 className="font-semibold text-cyan-700 mb-2">
              {session}
            </h3>

            <ul className="space-y-2">
              {grouped[session].map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>{item.itemName}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
}