import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: Props) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;