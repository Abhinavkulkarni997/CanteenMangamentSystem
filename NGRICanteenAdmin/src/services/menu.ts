import api from "./api";

export const getMenus = () => {
  return api.get("/menu-items");
};

export const createMenu = (data: any) => {
  return api.post("/menu-items", data);
};

export const updateMenu = (id: number, data: any) => {
  return api.put(`/menu-items/${id}`, data);
};

export const deleteMenu = (id: number) => {
  return api.delete(`/menu-items/${id}`);
};

export const updateAvailability = (

    id: number,

    isAvailable: boolean

) => {

    return api.patch(

        `/menu-items/${id}/availability`,

        {

            isAvailable,

        }

    );

};

export const getMenuHistory = (page:number,limit=10) => {
  return api.get(`/menu-items/history?page=${page}&limit=${limit}`);
};