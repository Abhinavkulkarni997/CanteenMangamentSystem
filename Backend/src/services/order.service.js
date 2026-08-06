// import * as repository from "../repositories/order.repository.js";

// import generateOrderNumber from "../utils/generateOrderNumber.js";

// import generateQrToken from "../utils/generateQrToken.js";
// import ApiError from "../utils/responses/ApiError.js";

// export const create = async(userId,items)=>{

//     const ids=items.map(item=>item.menuItemId);

//     const menuItems=await repository.getMenuItems(ids);

//     let total=0;

//     const orderItems=[];

//     for(const item of items){
//         console.log("Items from Request:", items);
//         console.log("Menu Items from DB:", menuItems);
//         const menu=menuItems.find(
//             x=>x.id===Number(item.menuItemId)
//         );
//         if (!menu) {
//             throw new ApiError(
//             404,
//             `Menu Item ${item.menuItemId} not found`
//         );
//         }
//         const unitPrice=Number(menu.price);

//         const totalPrice=unitPrice*item.quantity;

//         total+=totalPrice;

//         orderItems.push({

//             menuItemId:item.menuItemId,

//             quantity:item.quantity,

//             unitPrice,

//             totalPrice

//         });

//     }

//     return repository.createOrder({

//         data:{

//             orderNumber:generateOrderNumber(),

//             userId,

//             totalAmount:total,

//             paymentStatus:"SUCCESS",

//             transactionId:"DEMO_PAYMENT",

//             orderStatus:"BOOKED",

//             qrToken:generateQrToken(),

//             items:{
//                 create:orderItems
//             }

//         },

//         include:{
//             items:true
//         }

//     });

// };

// code is updated for generateOrderNumber is updated on 04-07-2026 in below code
import prisma from "../config/prisma.js";
import * as repository from "../repositories/order.repository.js";

import generateQrToken from "../utils/generateQrToken.js";

import generateOrderNumber from "../utils/generateOrderNumber.js";
import ApiError from "../utils/responses/ApiError.js";
import * as walletRepository from "../repositories/wallet.repository.js";

export const create = async (userId, items) => {

    return await prisma.$transaction(async (tx) => {

        //------------------------------------------------
        // Fetch Menu Items
        //------------------------------------------------

        const ids = items.map(i => Number(i.menuItemId));

        const menuItems = await tx.menuItem.findMany({

            where: {

                id: {

                    in: ids

                }

            }

        });

        let total = 0;

        const orderItems = [];

        for (const item of items) {

            const menu = menuItems.find(

                x => x.id === Number(item.menuItemId)

            );

            if (!menu) {

    throw new ApiError(
        404,
        `Menu Item ${item.menuItemId} not found`
    );

}

            const unitPrice = Number(menu.price);

            const totalPrice = unitPrice * item.quantity;

            total += totalPrice;

            orderItems.push({

                menuItemId: menu.id,

                quantity: item.quantity,

                unitPrice,

                totalPrice

            });

        }

        //------------------------------------------------
// Find Wallet
//------------------------------------------------

const wallet = await walletRepository.findWalletByUserIdTx(
    tx,
    userId
);

if (!wallet) {
    throw new ApiError(
        404,
        "Wallet not found"
    );
}

//------------------------------------------------
// Atomic Wallet Debit
//------------------------------------------------

const debitResult = await tx.wallet.updateMany({

    where: {

        id: wallet.id,

        balance: {

            gte: total

        }

    },

    data: {

        balance: {

            decrement: total

        }

    }

});

if (debitResult.count === 0) {

    throw new ApiError(

        400,

        "Insufficient wallet balance"

    );

}
console.log("Debit Result:", debitResult);

        //------------------------------------------------
        // Create Order
        //------------------------------------------------

        let order = await tx.order.create({

            data: {

                orderNumber: "TEMP",

                userId,

                totalAmount: total,

                paymentStatus: "SUCCESS",

                transactionId: `WALLET-${Date.now()}`,

                orderStatus: "BOOKED",

                qrToken: generateQrToken()

            }

        });

        //------------------------------------------------
        // Generate Order Number
        //------------------------------------------------

        const orderNumber = generateOrderNumber(order.id);

        //------------------------------------------------
        // Update Order Number
        //------------------------------------------------

        order = await tx.order.update({

            where: {

                id: order.id

            },

            data: {

                orderNumber

            }

        });

        //------------------------------------------------
        // Create Order Items
        //------------------------------------------------

        await tx.orderItem.createMany({

            data: orderItems.map(item => ({

                orderId: order.id,

                ...item

            }))

        });
        await walletRepository.createWalletTransactionTx(
    tx,
    {
        walletId: wallet.id,

        amount: total,

        type: "DEBIT",

        status: "SUCCESS",

        remarks: `Food Order ${order.orderNumber}`,

        referenceId: order.orderNumber,

        orderId: order.id
    }
);

        //------------------------------------------------
        // Return Complete Order
        //------------------------------------------------

        return await tx.order.findUnique({

            where: {

                id: order.id

            },

            include: {

                items: {

                    include: {

                       menuItem: {

        select: {

            id: true,
            itemName: true,
            sessionType: true

        }

    }

                    }

                }

            }

        });

    });

};

export const myOrders=async(userId)=>{
    return repository.getMyOrders(userId);
}

export const orderDetails=async(
    id,
    userId
)=>{
    const order=await repository.getOrderById(id,userId);
    if(!order){
        throw new ApiError(
            404,
            "Order not found"
        );
    }
    return order;
};

export const getOrders=async(query)=>{
    const page=Number(query.page) || 1;
    const limit=Number(query.limit) || 10;
    const search=query.search ?? "";
    const status=query.status;
    const orders=await repository.getOrders({
        page,
        limit,
        search,
        status,
    });
    const total=await repository.getOrdersCount({
        search,
        status,
    });
    return{
        orders,
        total,
        page,
        totalPages:Math.ceil(total/limit),
    };
};

export const collectOrder = async (id) => {

    const order = await prisma.order.findUnique({

        where: { id }

    });

    if (!order) {

        throw new ApiError(404, "Order not found");

    }

    if (order.orderStatus === "COLLECTED") {

        throw new ApiError(

            400,

            "Order already collected"

        );

    }

    return repository.collectOrder(id);

};
export const details = async (id) => {
    const order = await repository.findOrderById(id);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    return order;
};