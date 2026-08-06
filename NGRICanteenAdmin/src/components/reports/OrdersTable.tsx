import type { LatestOrder } from "../../types/order";

interface Props {
  data: LatestOrder[];
}

export default function OrdersTable({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Orders Report
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="px-4 py-3 text-left">Order No</th>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  {order.orderNumber}
                </td>

                <td className="px-4 py-3">
                  {order.user?.name ?? "Guest"}
                </td>

                <td className="px-4 py-3">
                  {order.items
                    .map((i) => i.menuItem.itemName)
                    .join(", ")}
                </td>

                <td className="px-4 py-3">
                  ₹{order.totalAmount}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      order.orderStatus === "BOOKED"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "COLLECTED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}