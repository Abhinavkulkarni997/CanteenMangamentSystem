import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as orderService from "@/services/order.service";

export function useCollectOrder() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id: number) =>

            orderService.collectOrder(id),

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["orders"]

            });

            queryClient.invalidateQueries({

                queryKey: ["order-details"]

            });

        },

    });

}