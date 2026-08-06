import type { Order } from "../../types/order";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Eye } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
   loading: boolean;
      onView: (id: number) => void;

}

export default function OrdersTable({ orders,loading, onView }: OrdersTableProps) {
    if (loading) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        Loading orders...
      </div>
    );
  }
  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3">Order No</th>

             <th className="text-left p-3">Employee / Project Staff ID</th>
            <th className="text-left p-3">Employee Name</th>
            <th className="text-left p-3">Mobile Number</th>
            

            <th className="text-center p-3">Items</th>

            <th className="text-center p-3">Amount</th>

            <th className="text-center p-3">Status</th>

            <th className="text-center p-3">Created</th>

            <th className="text-center p-3">Actions</th>
          </tr>
        </thead>
        

        <tbody>
              {orders.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="text-center py-8 text-muted-foreground"
              >
                No orders found.
              </td>
            </tr>
          ) : (
              orders.map((order) => (
            
            <tr key={order.id} className="border-t hover:bg-slate-50">
              <td className="p-3 font-medium">{order.orderNumber}</td>

              
              <td className="p-3">{order.user.employeeId ||
 order.user.projectStaffId ||
 "-"}</td>
              <td className="p-3">{order.user.name}</td>
              <td className="p-3">{order.user.mobile}</td>

              <td className="text-center">{order.items.length}</td>

              <td className="text-center">₹{order.totalAmount}</td>

              <td className="text-center">
                <Badge
                  variant={
                    order.orderStatus === "BOOKED"
                      ? "default"
                      : order.orderStatus === "COLLECTED"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </td>

              <td className="text-center">
                {new Date(order.createdAt).toLocaleString()}
              </td>

              <td className="text-center">
                <div className="flex justify-center gap-2">

    <Button

    variant="outline"

    size="icon"

    onClick={() => onView(order.id)}

>

    <Eye className="h-4 w-4" />

</Button>

</div>
              </td>
            </tr>
          )))}







          
          
        
        </tbody>
      </table>
      
    </div>
  );
}
