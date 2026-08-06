export interface LatestOrder{
    id:number,
    orderNumber:string,
    totalAmount:number,
    orderStatus:string,
    createdAt:string,
    user:{
        name:string,
        employeeId?:string | null,
        projectStaffId?: string | null,
        mobile:string,
    }
}

export interface Order{
    id:number;
    orderNumber:string;
    userId:number;
    totalAmount:string;
    paymentStatus:string;
    orderStatus:string;
    qrToken:string;
    createdAt:string;
    collectedAt?:string|null;
    user:{
        id:number;
        name:string;
        employeeId?:string | null;
        projectStaffId?: string | null;
        mobile:string;
    };
    items:{
        id:number;
        menuItemId:number;
        quantity:number;
        unitPrice:number;
        totalPrice:number;
    }[];
}
export interface OrdersResponse{
    orders:Order[];
    total:number;
    page:number;
    totalPages:number;
}
