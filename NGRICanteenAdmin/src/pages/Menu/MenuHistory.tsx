import { useMenuHistory } from "../../hooks/useMenuHistory";
import MenuHistoryTable from "../../components/menu/MenuHistoryTable";
import MenuSkeleton from "./MenuSkeleton";
import { useState } from "react";
import AppPagination from "../../components/common/AppPagination";

export default function MenuHistory() {
    const [page, setPage] = useState(1);

    const {

        history,

        loading,
        total,
        totalPages,
        // refresh,

    } = useMenuHistory(page);

    if (loading) {

        return <MenuSkeleton />;

    }

    return (
    
    <>
   

        <MenuHistoryTable

            history={history}

        />

        <AppPagination

    page={page}

    total={total}

    totalPages={totalPages}

    onPageChange={setPage}

/>
 </>
 

    );

}