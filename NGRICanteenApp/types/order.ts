export interface OrderItem{
    id:number;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
    menuItem: {
        id:number;
        itemName:string;
        sessionType:string;
    };

}
export interface Order{
    id:number;
    orderNumber:string;
    totalAmount:number;
    orderStatus:string;
    paymentStatus:string;
    createdAt:string;
    qrToken:string;
    items:OrderItem[];
}