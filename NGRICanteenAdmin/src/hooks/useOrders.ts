import { useQuery } from "@tanstack/react-query";
import * as orderService from "../services/order.service";

export const useOrders = (
  page = 1,
  search = "",
  status = ""
) => {

  return useQuery({

    queryKey: ["orders", page, search, status],

    queryFn: async () => {

      const res = await orderService.getOrders({

        page,

        limit: 10,

        search,

        status,

      });

      return res.data.data;

    },

  });

};