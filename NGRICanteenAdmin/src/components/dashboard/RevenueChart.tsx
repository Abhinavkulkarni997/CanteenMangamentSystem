import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,

} from "recharts";

// const data = [
//   { day: "Mon", revenue: 2500 },
//   { day: "Tue", revenue: 3200 },
//   { day: "Wed", revenue: 4100 },
//   { day: "Thu", revenue: 2800 },
//   { day: "Fri", revenue: 5200 },
//   { day: "Sat", revenue: 4600 },
//   { day: "Sun", revenue: 3000 },
// ];
interface Props {
  data: {
    day: string;
    revenue: number;
  }[];
}



export default function RevenueChart({data}:Props) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">

        Weekly Revenue

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart data={data}>

          <XAxis dataKey="day"/>

          <Tooltip formatter={(value: number) => [`₹${value}`, "Revenue"]}/>

          <Area
            dataKey="revenue"
            stroke="#0891b2"
            fill="#cffafe"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

}