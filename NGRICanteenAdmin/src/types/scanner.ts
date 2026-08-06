export interface ScannedOrder {

    id:number;

    orderNumber:string;

    totalAmount:string;

    orderStatus:string;

    user:{
        name:string;
        employeeId:string;
    }

}
export interface ScanHistoryItem extends ScannedOrder {
  scannedAt: string;
}