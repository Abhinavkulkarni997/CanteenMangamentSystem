import * as service from "../services/wallet.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";


export const getWallet = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const data = await service.getWallet(userId);

    return res.json(
        new ApiResponse(
            200,
            "Wallet fetched successfully",
            data
        )
    );

});

export const getWalletBalance = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const data = await service.getWalletBalance(userId);

    return res.json(
        new ApiResponse(
            200,
            "Wallet balance fetched successfully",
            data
        )
    );

});

export const getWalletTransactions = asyncHandler(async (req, res) => {

      const userId = Number(req.params.userId);

   const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const data = await service.getWalletTransactions(
        userId,
        page,
        limit
    );

    return res.json(
        new ApiResponse(
            200,
            "Wallet transactions fetched successfully",
            data
        )
    );

});

export const creditWallet = asyncHandler(async (req, res) => {
    console.log(req.user);

    const { userId } = req.params;

    const {
        amount,
        remarks,
    
    } = req.body;

    const data = await service.creditWallet({

        userId,

        amount,

        remarks,

        createdBy: req.user.id,

    });

    return res.json(
        new ApiResponse(
            200,
            "Wallet credited successfully",
            data
        )
    );

});

export const debitWallet = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const {
        amount,
        remarks,
        
        orderId,
    } = req.body;

    const data = await service.debitWallet({

        userId,

        amount,

        remarks,
        
        orderId,

        createdBy: req.user.id,

    });

    return res.json(
        new ApiResponse(
            200,
            "Wallet debited successfully",
            data
        )
    );

});




// user wallet controllers
export const getMyWallet = asyncHandler(async (req, res) => {

    const data = await service.getWallet(req.user.id);

    return res.json(
        new ApiResponse(
            200,
            "Wallet fetched successfully",
            data
        )
    );

});

// walletBalance 
export const getMyWalletBalance = asyncHandler(async (req, res) => {

    const data = await service.getWalletBalance(req.user.id);

    return res.json(
        new ApiResponse(
            200,
            "Wallet balance fetched successfully",
            data
        )
    );

});

// transactions 
export const getMyWalletTransactions = asyncHandler(async (req, res) => {

    const page = Math.max(1, Number(req.query.page) || 1);

    const limit = Math.min(
        100,
        Math.max(1, Number(req.query.limit) || 10)
    );

    const data = await service.getWalletTransactions(
        req.user.id,
        page,
        limit
    );

    return res.json(
        new ApiResponse(
            200,
            "Wallet transactions fetched successfully",
            data
        )
    );

});