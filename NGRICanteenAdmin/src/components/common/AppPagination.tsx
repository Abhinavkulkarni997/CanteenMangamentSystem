import {Button} from "../../components/ui/button";
interface AppPaginationProps {
    page: number;
    totalPages: number;
    total:number;
    onPageChange: (page: number) => void;
}
export default function AppPagination({
     page, 
     totalPages, 
     total, 
     onPageChange }:
      AppPaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
            Total Orders: <span className="font-medium">{total}</span>
        </p>
        <div className="flex items-center gap-2">
            <Button
            variant="outline"
            size="sm"
            disabled={page===1}
            onClick={()=>onPageChange(page-1)}
            >
                Previous

            </Button>
            <span className="text-sm font-medium">
                {page}/{totalPages}
            </span>
            <Button
            variant="outline"
            size="sm"
            disabled={page===totalPages}
            onClick={()=>onPageChange(page+1)}
            >
                Next
            </Button>

        </div>
</div>
    );
    }