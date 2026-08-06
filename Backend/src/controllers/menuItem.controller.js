import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";

import * as service from "../services/menuItem.service.js";

export const createMenu = asyncHandler(async(req,res)=>{

    const menu=await service.create(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Menu Item Created",
            menu
        )
    );

});

export const getTodayMenu=asyncHandler(async(req,res)=>{

    const menu=await service.todayMenu();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Today's Menu",
            menu
        )
    );

});

export const getAllMenus=asyncHandler(async(req,res)=>{

    const menu=await service.allMenus();

    return res.status(200).json(
        new ApiResponse(
            200,
            "All Menu Items",
            menu
        )
    );

});

export const updateMenu=asyncHandler(async(req,res)=>{

    const menu=await service.update(
        Number(req.params.id),
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Menu Updated",
            menu
        )
    );

});
export const updateAvailability = asyncHandler(async (req, res) => {

    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const menu = await service.updateAvailability(
        Number(req.params.id),
        req.body.isAvailable
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Availability Updated",
            menu
        )
    );
});

export const deleteMenu=asyncHandler(async(req,res)=>{

    await service.remove(
        Number(req.params.id)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Menu Deleted"
        )
    );

});
export const getMenuHistory = asyncHandler(async (req, res) => {
    const page = Math.max(
        1,
        Number(req.query.page) || 1
    );

    const limit = Math.max(
        1,
        Number(req.query.limit) || 10
    );


    const history = await service.menuHistory(page, limit);

    return res.json(
        new ApiResponse(
            200,
            "Menu History",
            history
        )
    );

});