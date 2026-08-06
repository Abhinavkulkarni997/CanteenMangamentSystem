import { Button } from "../ui/button";

interface Props {
  page: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-between mt-6">

      <p className="text-sm text-slate-500">
        Total Records: {total}
      </p>

      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>

      </div>
    </div>
  );
}