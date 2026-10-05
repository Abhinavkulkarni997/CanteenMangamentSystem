import { useState } from "react";

import { useAuditLogs } from "../../hooks/useAuditLogs";

import AuditTable from "../../components/audit/AuditTable";
import AuditFilters from "../../components/audit/AuditFilters";
import AuditStats from "../../components/audit/AuditStats";
import { Button } from "../../components/ui/button";
export default function AuditLogs() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  // const [adminId, setAdminId] = useState<number>();
  const [adminId] = useState<number | undefined>(undefined);

  const { data, loading } = useAuditLogs({
    page,
    limit: 10,
    search,
    startDate,
    endDate,
    adminId,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Audit Logs
      </h1>

      <AuditFilters
        search={search}
        setSearch={setSearch}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <AuditStats logs={data.logs} />

      <AuditTable logs={data.logs} />

      <div className="flex justify-end gap-4">

        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span>
          Page {data.page} of {data.pages}
        </span>

        <Button
          disabled={page === data.pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

      </div>

    </div>
  );
}