import prisma from "../config/prisma.js";

export const reportSummary = async (startDate, endDate) => {
  const [
    totalOrders,
    bookedOrders,
    collectedOrders,
    cancelledOrders,
    revenue,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),

    prisma.order.count({
      where: {
        orderStatus: "BOOKED",
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),

    prisma.order.count({
      where: {
        orderStatus: "COLLECTED",
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),

    prisma.order.count({
      where: {
        orderStatus: "CANCELLED",
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),

    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentStatus: "SUCCESS",
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    }),
  ]);

  return {
    totalOrders,
    bookedOrders,
    collectedOrders,
    cancelledOrders,
    totalRevenue: Number(revenue._sum.totalAmount ?? 0),
  };
};

export const revenueReport = async (startDate, endDate) => {
  const data = [];

  const current = new Date(startDate);

  while (current < endDate) {
    const next = new Date(current);
    next.setDate(next.getDate() + 1);

    const revenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentStatus: "SUCCESS",
        createdAt: {
          gte: current,
          lt: next,
        },
      },
    });

    data.push({
      day: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue: Number(revenue._sum.totalAmount ?? 0),
    });

    current.setDate(current.getDate() + 1);
  }

  return data;
};
export const mealReport = async (startDate, endDate) => {
  const stats = await prisma.orderItem.groupBy({
    by: ["menuItemId"],

    _sum: {
      quantity: true,
    },

    where: {
      order: {
        paymentStatus: "SUCCESS",
        createdAt: {
          gte: startDate,
          lt: endDate,
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


export const reportOrders = async ({
  page = 1,
  limit = 10,
  search = "",
  status,
  startDate,
  endDate,
}) => {
  const where = {};

  if (status) {
    where.orderStatus = status;
  }

  if (search) {
    where.OR = [
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
    ];
  }

  where.createdAt = {
    gte: startDate,
    lt: endDate,
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: Number(limit),

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
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};