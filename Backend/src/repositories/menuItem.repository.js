import prisma from "../config/prisma.js";

export const createMenuItem = (data) => {
    return prisma.menuItem.create({
        data
    });
};

export const getTodayMenu = (menuDate) => {
  
    return prisma.menuItem.findMany({
        where: {
            menuDate,
            isAvailable: true
        },
        orderBy: [
            {
                sessionType: "asc"
            },
            {
                itemName: "asc"
            }
        ]
    });
};

// the below getAllMenuItems function is used to get all the menu items for a specific date like todays ,yesterdays pastmonths as we developed history tab only we want today menus. 
// It is used in the admin panel to view the menu items for a specific date.
// export const getAllMenuItems = () => {
//     return prisma.menuItem.findMany({
//         orderBy: {
//             createdAt: "desc"
//         }
//     });
// };

// Fetch only today's menu items.
//
// Older menu items are now displayed in the Menu History module.
// This keeps the Today's Menu page clean and prevents historical
// records from appearing with active menu cards.
export const getAllMenuItems = () => {
    const today = new Date();

today.setHours(0, 0, 0, 0);

return prisma.menuItem.findMany({
    where: {
        menuDate: today,
    },
    orderBy: [
        {
            sessionType: "asc",
        },
        {
            itemName: "asc",
        },
    ],
});
}



export const updateMenuItem = (id, data) => {
    return prisma.menuItem.update({
        where: {
            id
        },
        data
    });
};

export const updateAvailability = (

    id,

    isAvailable

) => {

    return prisma.menuItem.update({

        where: {

            id

        },

        data: {

            isAvailable

        }

    });

};

// export const deleteMenuItem = (id) => {
//     return prisma.menuItem.update({
//         where: {
//             id
//         },
//         data: {
//             isavailable: false
//         }
//     });
// };
export const deletePermanent = (id) => {

    return prisma.menuItem.delete({

        where: {

            id

        }

    });

};
export const getOrderCount=(menuItemId)=>{
    return prisma.orderItem.count({
        where:{
            menuItemId
        }
    });
};

export const getMenuHistory = async (
    page = 1,
    limit = 10
) => {

    const today = new Date();

    today.setHours(0,0,0,0);

    const items = await prisma.menuItem.findMany({

        where:{
            menuDate:{
                lt: today
            }
        },

        orderBy:[
            {
                menuDate:"desc"
            },
            {
                sessionType:"asc"
            }
        ]

    });

    const grouped = [];

    items.forEach(item => {

        const existing = grouped.find(

            g =>

                g.menuDate.getTime() === item.menuDate.getTime() &&

                g.sessionType === item.sessionType

        );

        if(existing){

            existing.items.push(item);

        }else{

            grouped.push({

                menuDate:item.menuDate,

                sessionType:item.sessionType,

                isAvailable:item.isAvailable,

                items:[item]

            });

        }

    });

    const total = grouped.length;

    const start = (page - 1) * limit;

    const paginated = grouped.slice(

        start,

        start + limit

    );

    return {

        history: paginated,

        total,

        page,

        totalPages: Math.ceil(total / limit)

    };

};