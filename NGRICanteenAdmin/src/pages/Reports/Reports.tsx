import { useState } from "react";
import { useReports } from "../../hooks/useReports";
import PageContainer from "../../components/common/PageContainer";
// import ReportSummary from "../../components/reports/ReportSummary";
import OrdersTable from "../../components/reports/OrdersTable";
import RevenueChart from "../../components/dashboard/RevenueChart";
import MealStats from "../../components/dashboard/MealStats";
import KPISection from "../../components/dashboard/KPISection";
import DateFilter from "../../components/reports/DateFilter";
import { Button } from "../../components/ui/button";

export default function Reports(){
  const [page,setPage]=useState(1);
const [search, setSearch] = useState("");
const [status, setStatus] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");


const { data, loading } = useReports({
   page,
    limit: 10,
  search,
  status,
  startDate,
  endDate,
});

if (loading || !data) {
  return <>Loading...</>;
}

return (
  <PageContainer
    title="Reports"
    description="Revenue and Order Reports"
>
  <DateFilter
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  startDate={startDate}
  setStartDate={setStartDate}
  endDate={endDate}
  setEndDate={setEndDate}
/>

    <KPISection dashboard={data.summary} />

    <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">
            <RevenueChart data={data.revenue} />
        </div>

        <MealStats data={data.meals} />

    </div>

    <div className="mt-6">

        <OrdersTable
            data={data.orders.orders}
        />

    </div>

    <div className="flex justify-end mt-4 gap-2">

  <Button disabled={page === 1}
          onClick={() => setPage(page - 1)}>Previous</Button>

  <span>
    Page {data.orders.page} of {data.orders.pages}
  </span>

  <Button disabled={page === data.orders.pages}
          onClick={() => setPage(page + 1)}>Next</Button>

</div>


</PageContainer>
);

}