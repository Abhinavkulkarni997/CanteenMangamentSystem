import prisma from "../config/prisma.js";

export const findOrderByQrToken = (qrToken) => {
  return prisma.order.findFirst({
    where: {
      qrToken,
    },
    include: {
      user: {
        select: {
          id: true,

          name: true,

          mobile: true,

          employeeId: true,
          projectStaffId: true,

          designation: true,

          division: true,

          role: true,

          userType: true,
        },
      },
      items: {
        include: {
          menuItem: {
            select: {
              id: true,
              itemName: true,
              sessionType: true,
            },
          },
        },
      },
    },
  });
};

export const collectOrder = (id) => {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      orderStatus: "COLLECTED",
      collectedAt: new Date(),
    },
  });
};

export const dashboard = async (todayStart, tomorrowStart) => {
  const [totalOrders, bookedOrders, collectedOrders, cancelledOrders, revenue] =
    await Promise.all([
      prisma.order.count({
        where: {
          createdAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },
        },
      }),

      prisma.order.count({
        where: {
          orderStatus: "BOOKED",
          createdAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },
        },
      }),

      prisma.order.count({
        where: {
          orderStatus: "COLLECTED",
          createdAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },
        },
      }),

      prisma.order.count({
        where: {
          orderStatus: "CANCELLED",
          createdAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },
        },
      }),

      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },

        where: {
          createdAt: {
            gte: todayStart,
            lt: tomorrowStart,
          },
        },
      }),
    ]);

  return {
    totalOrders,

    bookedOrders,

    collectedOrders,

    cancelledOrders,

    totalRevenue: revenue._sum.totalAmount ?? 0,
  };
};

export const todayOrders = () => {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,

          name: true,

          mobile: true,

          employeeId: true,
          projectStaffId: true,
          designation: true,

          division: true,

          role: true,

          userType: true,
        },
      },

      items: {
        include: {
          menuItem: {
            select: {
              id: true,
              itemName: true,
              sessionType: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const latestOrders = () => {
  return prisma.order.findMany({
    take: 10,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      user: {
        select: {
          id: true,

          name: true,

          mobile: true,

          employeeId: true,
          projectStaffId: true,

          designation: true,

          division: true,

          role: true,

          userType: true,
        },
      },

      items: {
        include: {
          menuItem: {
            select: {
              id: true,
              itemName: true,
              sessionType: true,
            },
          },
        },
      },
    },
  });
};

export const getOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  date,
}) => {
  const where = {
    ...(status && {
      orderStatus: status,
    }),

    ...(search && {
      OR: [
        {
          orderNumber: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),
  };

  if (date) {
    const start = new Date(date);

    start.setHours(0, 0, 0, 0);

    const end = new Date(date);

    end.setHours(23, 59, 59, 999);

    where.createdAt = {
      gte: start,

      lte: end,
    };
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip: (page - 1) * limit,

      take: limit,

      where,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            employeeId: true,
            projectStaffId: true,
            mobile: true,
            designation: true,
            division: true,
          },
        },

        items: {
          include: {
            menuItem: {
              select: {
                itemName: true,
                sessionType: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.order.count({
      where,
    }),
  ]);

  return {
    orders,

    total,
  };
};

// export const scanQr = (qrToken) => {

//     return prisma.order.findFirst({

//         where: {

//             qrToken,

//         },

//         include: {

//             user: {

//                 select: {

//                     id: true,

//                     name: true,

//                     employeeId: true,

//                     designation: true,

//                     division: true,

//                 }

//             },

//             items: {

//                 include: {

//                     menuItem: {

//                         select: {

//                             itemName: true,

//                             sessionType: true,

//                         }

//                     }

//                 }

//             }

//         }

//     });

// };
export const createScanLog = (orderId, adminId, device, ipAddress) => {
  return prisma.scanLog.create({
    data: {
      orderId,

      adminId,

      device,

      ipAddress,
    },
  });
};
export const mealStats = async (todayStart, tomorrowStart) => {
  const stats = await prisma.orderItem.groupBy({
    by: ["menuItemId"],

    _sum: {
      quantity: true,
    },

    where: {
      order: {
        paymentStatus: "SUCCESS",
        createdAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
    },
  });

  const menuItems = await prisma.menuItem.findMany({
    select: {
      id: true,
      sessionType: true,
    },
  });

  const sessionMap = menuItems.reduce((acc, item) => {
    acc[item.id] = item.sessionType;
    return acc;
  }, {});

  const result = {
    BREAKFAST: 0,
    LUNCH: 0,
    DINNER: 0,
  };

  stats.forEach((item) => {
    const session = sessionMap[item.menuItemId];

    if (session) {
      result[session] += item._sum.quantity ?? 0;
    }
  });

  return result;
};
export const weeklyRevenue = async () => {
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - i);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },

      where: {
        paymentStatus: "SUCCESS",
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    data.push({
      day: start.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      revenue: Number(revenue._sum.totalAmount ?? 0),
    });
  }

  return data;
};

export const dashboardTodayMenu = (todayStart, tomorrowStart) => {
  return prisma.menuItem.findMany({
    where: {
      menuDate: {
        gte: todayStart,
        lt: tomorrowStart,
      },
      isAvailable: true,
    },
    orderBy: [
      { sessionType: "asc" },
      { itemName: "asc" },
    ],
  });
};