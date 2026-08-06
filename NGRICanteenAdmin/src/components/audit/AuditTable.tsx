import type { AuditLog } from "../../types/audit";

interface Props {
  logs: AuditLog[];
}

export default function AuditTable({ logs }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
     <div className="overflow-x-auto">
    <table className="min-w-full border-collapse">

      <thead>

        <tr className="border-b bg-slate-100">

          <th className="px-4 py-3 text-left">Order</th>

          <th className="px-4 py-3 text-left">Employee</th>

          <th className="px-4 py-3 text-left">Admin</th>

          <th className="px-4 py-3 text-left">Device</th>

          <th className="px-4 py-3 text-left">IP</th>

          <th className="px-4 py-3 text-left">Time</th>

        </tr>

      </thead>

      <tbody>

        {logs.map(log => (

          <tr
            key={log.id}
            className="border-b hover:bg-slate-50"
          >

            <td className="px-4 py-3">{log.order.orderNumber}</td>

            <td className="px-4 py-3">{log.order.user.name}</td>

            <td className="px-4 py-3">{log.admin.name}</td>

            <td className="px-4 py-3">{log.device}</td>

            <td className="px-4 py-3">{log.ipAddress}</td>

            <td className="px-4 py-3">
              {new Date(log.scannedAt).toLocaleString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>
    </div>
    </div>
  );
}