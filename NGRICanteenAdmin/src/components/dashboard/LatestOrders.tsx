import type { LatestOrder } from "../../types/order";
import StatusBadge from "../common/StatusBadge";

interface Props{
    orders:LatestOrder[];

}


const LatestOrders=({orders}: Props) => {

    if (!orders.length) {
  return (
    <div className="rounded-xl bg-white p-8 text-center shadow">
      No recent orders found.
    </div>
  );
}
    return(
    <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-5">
               <h2 className="font-bold text-xl mb-5">

        Latest Orders

        </h2>
        </div>
        <div className="space-y-2">
             {orders.map(order=>(
                <div key={order.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                    <div>
                        <p className="font-semibold">
                            {order.orderNumber}
                        </p>
                        <p className="text-sm text-slate-500">
                            {order.user?.name??"Guest"}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">
                           ₹ {order.totalAmount}
                        </p>
                        <StatusBadge status={order.orderStatus}/>
                    </div>

                </div>

        

    ))}

        </div>

   

</div>
)
}



export default LatestOrders;