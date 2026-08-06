interface Props {
  search: string;
  setSearch: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;
}

export default function AuditFilters({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="grid grid-cols-4 gap-4">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-lg p-2"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-lg p-2"
        />

        {/* <button
          className="bg-cyan-600 text-white rounded-lg"
        >
          Apply
        </button> */}

      </div>

    </div>
  );
}