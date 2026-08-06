import { useEffect, useState } from "react";
import * as menuService from "../services/menu";
import type { MenuItem } from "../types/menu";

export function useMenu() {

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMenu = async () => {

        try {

            setLoading(true);

            const response = await menuService.getMenus();

            setMenu(response.data.data);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadMenu();

    }, []);

    return {

        menu,
        loading,
        refresh: loadMenu,

    };

}