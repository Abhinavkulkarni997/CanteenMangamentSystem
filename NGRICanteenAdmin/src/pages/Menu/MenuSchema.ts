import {z} from "zod";
export const menuSchema=z.object({
    itemName:z.string().min(2,"Item name is required"),
    description:z.string().optional(),
    price:z.coerce.number().min(1,"Price must be greater than zero"),
    sessionType:z.enum(["LUNCH","DINNER"])

});
export type MenuFormInput = z.input<typeof menuSchema>;
export type MenuForm=z.infer<typeof menuSchema>;