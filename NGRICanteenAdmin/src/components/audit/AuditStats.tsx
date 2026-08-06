import type { AuditLog } from "../../types/audit";

interface Props {
  logs: AuditLog[];
}

export default function AuditStats({ logs }: Props) {
  const uniqueAdmins = new Set(
    logs.map((l) => l.admin.id)
  ).size;

  const uniqueDevices = new Set(
    logs.map((l) => l.device)
  ).size;

  return (
    <div className="grid grid-cols-3 gap-5">

      <div className="rounded-xl shadow bg-white p-5">

        <p>Total Logs</p>

        <h2 className="text-3xl font-bold">
          {logs.length}
        </h2>

      </div>

      <div className="rounded-xl shadow bg-white p-5">

        <p>Admins</p>

        <h2 className="text-3xl font-bold">
          {uniqueAdmins}
        </h2>

      </div>

      <div className="rounded-xl shadow bg-white p-5">

        <p>Devices</p>

        <h2 className="text-3xl font-bold">
          {uniqueDevices}
        </h2>

      </div>

    </div>
  );
}