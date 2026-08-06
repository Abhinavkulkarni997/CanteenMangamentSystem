import { MaterialCommunityIcons } from "@expo/vector-icons";

export function getMenuIcon(itemName: string) {
  const name = itemName.toLowerCase();

  if (name.includes("rice")) return "rice";
  if (name.includes("sambar")) return "bowl";
  if (name.includes("curry")) return "pot-steam";
  if (name.includes("curd")) return "cup";
  if (name.includes("chapati")) return "bread-slice";
  if (name.includes("biryani")) return "pot-mix";
  if (name.includes("chicken")) return "food-drumstick";
  if (name.includes("tea")) return "coffee";
  if (name.includes("coffee")) return "coffee";

  return "silverware-fork-knife";
}