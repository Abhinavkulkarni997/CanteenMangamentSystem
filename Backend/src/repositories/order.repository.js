import prisma from "../config/prisma.js";

export const getMenuItems = (ids) => {

    return prisma.menuItem.findMany({
        where:{
            id:{
                in:ids
            }
        }
    });

};

export const createOrder = (data) => {

    return prisma.order.create(data);

};

export const getOrders = ({
    page = 1,
    limit = 10,
    search = "",
    status,
}) => {

    return prisma.order.findMany({

        skip: (page - 1) * limit,

        take: limit,

        where: {

            ...(status && {

                orderStatus: status,

            }),

            ...(search && {

                OR: [

                    {

                        orderNumber: {

                            contains: search,

                            mode: "insensitive",

                        }

                    },

                    {

                        user: {

                            name: {

                                contains: search,

                                mode: "insensitive",

                            }

                        }

                    },
                    {
                        user:{
                            employeeId:{
                                contains:search,
                                mode:"insensitive",
                            },
                        },
                    },
                    {
                        user:{
                            projectStaffId:{
                                contains:search,
                                mode:"insensitive",
                            }
                        }
                    },
                    {
                          user:{
                        mobile:{
                            contains:search,
                            mode:"insensitive",
                        }
                    }

                    }
                  


                ]

            })

        },

        include: {

            user: {

                select: {

                    id: true,

                    name: true,

                    employeeId: true,
                    projectStaffId: true,
                    mobile: true,

                }

            },

            items: true

        },

        orderBy: {

            createdAt: "desc"

        }

    });

};

export const getOrdersCount = ({
    search = "",
    status,
}) => {

    return prisma.order.count({

        where: {

            ...(status && {

                orderStatus: status,

            }),

            ...(search && {

                OR: [

                    {

                        orderNumber: {

                            contains: search,

                            mode: "insensitive",

                        }

                    },

                    {

                        user: {

                            name: {

                                contains: search,

                                mode: "insensitive",

                            }

                        }

                    },
                    {
                        user:{
                            employeeId:{
                                contains:search,
                                mode:"insensitive",
                            },
                        },
                    },
                    {
                        user:{
                            projectStaffId:{
                                contains:search,
                                mode:"insensitive",
                            },
                        },
                    },
                    {
                        user:{
                            mobile:{
                                contains:search,
                                mode:"insensitive", 
                        },
                    },
                },

                ]

            })

        }

    });

};

export const updateOrderNumber=(id,orderNumber)=>{
    return prisma.order.update({
        where:{
            id
        },
        data:{
            orderNumber
        }
    });
};

export const getMyOrders=(userId)=>{
    return prisma.order.findMany({
        where:{
            userId
        },
        include:{
            items:{
                include:{
                    menuItem: {

        select: {

            id: true,
            itemName: true,
            sessionType: true

        }

    }
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });
};

// export const getOrderById=(id,userId)=>{
//     return prisma.order.findFirst({
//         where:{
//             id,
//             userId
//         },
//         include:{
//            items:{
//             include:{
//                menuItem: {

//         select: {

//             id: true,
//             itemName: true,
//             sessionType: true

//         }

//     }
//             }
//            } 
//         }
//     });
// };

export const getOrderById = (id, userId) => {

    return prisma.order.findFirst({

        where: {

            id,

            userId

        },

        include: {

            user: {

                select: {

                    id: true,

                    name: true,

                    employeeId: true,
                    projectStaffId: true,
                    mobile: true,
                    

                }

            },

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

};

export const collectOrder=(id)=>{
    return prisma.order.update({
        where:{
            id,
        },
        data:{
            orderStatus:"COLLECTED",
            collectedAt:new Date(),
        },
    });
};

export const findOrderById = (id) => {
    return prisma.order.findUnique({
        where: {
            id: Number(id)
        },

        include: {

            user: {
                select: {
                    id: true,
                    name: true,
                    employeeId: true,
                    projectStaffId: true,
                    designation: true,
                    division: true,
                    mobile: true,
                    role: true
                }
            },

            items: {

                include: {

                    menuItem: true

                }

            }

        }

    });
};