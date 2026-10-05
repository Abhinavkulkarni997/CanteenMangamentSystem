import OrdersTable from "../../components/orders/OrdersTable";
import { useOrders } from "../../hooks/useOrders";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
// import { Button } from "../../components/ui/button";
import AppPagination from "../../components/common/AppPagination";
import OrderDetailsDialog from "../../components/orders/OrderDetailsDialog";
import useDebounce from "../../hooks/useDebounce";
export default function Orders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
const [dialogOpen, setDialogOpen] = useState(false);

  
const debouncedSearch = useDebounce(search, 500);
const { data, isLoading } = useOrders(
    page,
    debouncedSearch,
    status === "ALL" ? "" : status,
);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center"> */}
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>

          <p className="text-muted-foreground">Manage all canteen orders</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4">
            <Input
              placeholder="Search by Order No, Employee ID, Project Staff ID, Mobile or Name"
              className="max-w-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setPage(1);
              }}
            />
            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value??"");

                setPage(1);
              }}
            >
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>

                <SelectItem value="BOOKED">Booked</SelectItem>

                <SelectItem value="COLLECTED">Collected</SelectItem>

                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
             </div>
          </CardContent>
         
        </Card>
      {/* </div> */}

      <OrdersTable orders={data?.orders ?? []}  loading={isLoading}
       onView={(id) => {

        setSelectedOrder(id);

        setDialogOpen(true);

    }}/>
    <OrderDetailsDialog

    open={dialogOpen}

    onOpenChange={setDialogOpen}

    orderId={selectedOrder}

/>
{data && (
  <AppPagination
    page={data.page}
    totalPages={data.totalPages}
    total={data.total}
    onPageChange={setPage}
  />
)}


      {/* <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">
            Showing page {data?.page} of {data?.totalPages}
        </p>
        <div className="flex gap-2">
          <Button 
          variant="outline"
          disabled={page==1}
          onClick={()=>setPage(page-1)}
          >Previous</Button>
          <Button 
          variant="outline"
          disabled={page==data?.totalPages}
          onClick={()=>setPage(page+1)}
          >Next</Button>
        </div>
        
      </div> */}
    </div>
  );
}
