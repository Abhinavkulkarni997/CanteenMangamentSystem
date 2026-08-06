interface Props {
  data: {
    // BREAKFAST: number;
    LUNCH: number;
    DINNER: number;
  };
}

export default function MealStats({ data }: Props) {
  const total =
    // data.BREAKFAST +
    data.LUNCH +
    data.DINNER;

  const percent = (value: number) =>
    total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Meal Statistics
      </h2>

      {Object.entries(data)
       .filter(([meal]) => meal !== "BREAKFAST")
      .map(([meal, count]) => (
        <div key={meal} className="mb-5">
          <div className="flex justify-between">
            <span>{meal}</span>
            <span>{count}</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-3 mt-2">
            <div
              className="bg-cyan-600 h-3 rounded-full"
              style={{
                width: `${percent(count)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}