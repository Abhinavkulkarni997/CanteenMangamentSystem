// export interface MenuItem {

//     id:number;

//     itemName:string;

//     sessionType:string;

//     description?:string;

//     price:number;

// }
export type SessionType =  "LUNCH" | "DINNER";

export interface MenuItem {
    id: number;

    itemName: string;

    description?: string;

    sessionType: SessionType;

    price: number;

    isAvailable: boolean;

    quantity: number;
}