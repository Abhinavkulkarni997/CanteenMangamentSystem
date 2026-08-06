import * as repository from "../repositories/menuItem.repository.js";
import ApiError from "../utils/responses/apiError.js";

    export const create = async (body) => {

    body.menuDate = new Date();

    body.menuDate.setHours(0, 0, 0, 0);

    return repository.createMenuItem(body);

        };




export const todayMenu = async () => {

    const today = new Date();

    today.setHours(0,0,0,0);

    return repository.getTodayMenu(today);

};

export const allMenus = async () => {

    return repository.getAllMenuItems();

};

export const update = async (id, body) => {

    return repository.updateMenuItem(id, body);

};

// export const remove = async (id) => {

//     return repository.deleteMenuItem(id);

// };
// the below remove function is used to check if the menu item is associated with any order before deleting it. If it is associated with an order, it throws an error. Otherwise, it deletes the menu item.
export const remove = async (id) => {

    const orderCount = await repository.getOrderCount(id);

    if (orderCount > 0) {

        throw new ApiError(

            409,

            "This menu item has already been used in orders. Disable it instead."

        );

    }

    return repository.deletePermanent(id);

}; 
export const updateAvailability = async (

    id,     

    isAvailable

) => {

    return repository.updateAvailability(

        id,

        isAvailable

    );

};
export const menuHistory = async (page=1, limit=10) => {

    return repository.getMenuHistory(page, limit);

};