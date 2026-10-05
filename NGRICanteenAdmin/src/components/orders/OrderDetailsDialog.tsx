import {Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
}
from "../../components/ui/dialog";

import {useOrderDetails} from "../../hooks/useOrderDetails";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useCollectOrder } from "../../hooks/useCollectOrder";
import type { Order } from "../../types/order";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean) => void;
    orderId:number|null;
}
export default function OrderDetails({
    open, 
    onOpenChange,
    orderId,
}:Props){
    const {data,isLoading}=useOrderDetails(orderId);
    const collectMutation = useCollectOrder();
   const handleCollect = () => {

    if (!orderId) return;

    const confirmed = window.confirm(
        "Are you sure you want to mark this order as collected?"
    );

    if (!confirmed) return;

    collectMutation.mutate(orderId, {

        onSuccess: () => {

            onOpenChange(false);

        },

    });

};
    return(
        <Dialog 
        open={open}
        onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Order Details
                    </DialogTitle>
                </DialogHeader>
                {isLoading && (
                    <p>Loading...</p>
                )}
                {!isLoading && data && (
                    <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">

    <div>
        <p className="text-sm text-muted-foreground">

            Order Number

        </p>

        <p className="font-mono text-sm">

            {data.orderNumber}

        </p>

    </div>

    <div>

        <p className="text-sm text-muted-foreground">

            Employee

        </p>

        <p className="font-semibold">

            {data.user.name}

        </p>

    </div>

    <div>

        <p className="text-sm text-muted-foreground">

            Employee / Project Staff ID

        </p>

        <p>

            {data.user.employeeId || data.user.projectStaffId || "-"}

        </p>

    </div>

    <div>

<p className="text-sm text-muted-foreground">
Mobile Number
</p>

<p>
{data.user.mobile}
</p>

</div>

    <div>

        <p className="text-sm text-muted-foreground">

            Created

        </p>

        <p>

            {new Date(data.createdAt).toLocaleString()}

        </p>

    </div>

</div>
<div className="flex gap-3 mt-6">

    <Badge className="bg-blue-600 hover:bg-blue-600">

        {data.orderStatus}

    </Badge>

    <Badge variant="secondary">

        {data.paymentStatus}

    </Badge>

</div>
<div className="mt-6">

    <h3 className="font-semibold mb-3">

        Ordered Items

    </h3>

    <table className="w-full">

        <thead>

            <tr className="border-b">

                <th className="text-left py-2">
                    Item
                </th>

                <th className="text-left">
                    Session
                </th>

                <th className="text-center">
                    Qty
                </th>

                <th className="text-right">
                    Total
                </th>

            </tr>

        </thead>

        <tbody>

            {data.items.map((item:Order["items"][number]) => (

                <tr
                    key={item.id}
                    className="border-b"
                >

                    <td className="py-2">

                        {item.menuItem.itemName}

                    </td>

                    <td>

                        {item.menuItem.sessionType}

                    </td>

                    <td className="text-center">

                        {item.quantity}

                    </td>

                    <td className="text-right">

                        ₹{item.totalPrice}

                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>
<div className="flex justify-end mt-6">

    <div className="text-xl font-bold">

        Total : ₹{data.totalAmount}

    </div>

</div>

</div>
                )}
                 <DialogFooter>

    <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
    >
        Close
    </Button>

    {data && (
        data.orderStatus === "BOOKED" ? (
            <Button
                onClick={handleCollect}
                disabled={collectMutation.isPending}
            >
                {collectMutation.isPending
                    ? "Collecting..."
                    : "Collect Order"}
            </Button>
        ) : (
            <Badge className="bg-green-600 hover:bg-green-600 mt-1 p-3">
                Order Collected
            </Badge>
        )
    )}

</DialogFooter>
                


            </DialogContent>
          

        </Dialog>
    );
}
