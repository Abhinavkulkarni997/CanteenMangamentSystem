
export interface CartItem {

    menuItemId:number;

    itemName:string;

    price:number;

    quantity:number;
    sessionType:  "LUNCH" | "DINNER";
}