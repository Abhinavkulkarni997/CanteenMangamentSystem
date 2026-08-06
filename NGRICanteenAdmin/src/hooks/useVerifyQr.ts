import { useMutation } from "@tanstack/react-query";
import * as adminService from "@/services/admin.service";

export function useVerifyQr() {

    return useMutation({

        mutationFn: adminService.verifyQr,

    });

}