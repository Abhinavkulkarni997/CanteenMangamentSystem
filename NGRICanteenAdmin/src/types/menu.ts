export interface MenuItem {

    id: number;

    itemName: string;

    description?: string;

    sessionType: "LUNCH" | "DINNER";

    price: number;

    isAvailable?: boolean;

    menuDate?: string;
}
export interface MenuHistory {

    menuDate: string;

    sessionType: "LUNCH" | "DINNER";

    isAvailable: boolean;

    items: MenuItem[];

}