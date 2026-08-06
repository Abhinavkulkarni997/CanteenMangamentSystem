
interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;
}

export default function DateFilter({
  search,
  setSearch,
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <div className="grid grid-cols-5 gap-4">

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Search employee/order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="BOOKED">Booked</option>
          <option value="COLLECTED">Collected</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {/* <label>End Date</label> */}
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* <button
          className="bg-cyan-600 text-white rounded-lg px-4 py-2"
        >
          Apply
        </button> */}

      </div>
    </div>
  );
}