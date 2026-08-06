import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/responses/ApiResponse.js";

import * as service from "../services/order.service.js";

export const createOrder=asyncHandler(async(req,res)=>{

    const order=await service.create(

        req.user.id,

        req.body.items

    );

    return res.status(201).json(

        new ApiResponse(

            201,

            "Order Created",

            order

        )

    );

});

export const myOrders=asyncHandler(async(req,res)=>{
    const orders=await service.myOrders(req.user.id);
    return res.status(200).json(
        new ApiResponse(200,"My Orders",orders)
    );
});

export const orderDetails = asyncHandler(async (req, res) => {

    const order = await service.orderDetails(

        Number(req.params.id),

        req.user.id

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Order Details",

            order

        )

    );

});

export const getOrders= asyncHandler(async(req,res)=>{
    const result= await service.getOrders(req.query);
    return res.status(200).json(
        new ApiResponse(
            200,
            "Orders fetched successfully",
            result
        )
    );

});

export const collectOrder = asyncHandler(async (req, res) => {

    const order = await service.collectOrder(

        Number(req.params.id)

    );

    return res.status(200).json(

        new ApiResponse(

            200,

            "Order collected successfully",

            order

        )

    );

});
export const details = asyncHandler(async(req,res)=>{

    const order = await service.details(
        req.params.id
    );

    return res.json(
        new ApiResponse(
            200,
            "Order Details",
            order,
            
        )
    );

});