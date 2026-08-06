import api from "./api";
export const verifyQr = (qrToken: string) => {

    return api.post("/admin/verify-qr", {

        qrToken,

    });

};