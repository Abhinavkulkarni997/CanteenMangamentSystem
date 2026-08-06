import { useEffect, useState } from "react";
import * as menuService from "../services/menu";
import type { MenuHistory } from "../types/menu";

export function useMenuHistory(page: number) {

    const [history, setHistory] = useState<MenuHistory[]>([]);
    const [loading, setLoading] = useState(true);

    const [total, setTotal] = useState(0);

    const [totalPages, setTotalPages] = useState(1);

    const loadHistory = async () => {

        try {

            setLoading(true);

            const response =
                await menuService.getMenuHistory(page);

            setHistory(
                response.data.data.history
            );

            setTotal(
                response.data.data.total
            );

            setTotalPages(
                response.data.data.totalPages
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadHistory();

    }, [page]);

    return {

        history,

        loading,

        total,

        totalPages,

        refresh: loadHistory,

    };

}