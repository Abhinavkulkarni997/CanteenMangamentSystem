import prisma from "../config/prisma.js";

export const getLogs = async ({
  page = 1,
  limit = 10,
  search = "",
  startDate,
  endDate,
  adminId,
}) => {
  page = Number(page);
  limit = Number(limit);

  const where = {};

  if (adminId) {
    where.adminId = Number(adminId);
  }

  if (startDate || endDate) {
    where.scannedAt = {};

    if (startDate) {
      where.scannedAt.gte = new Date(startDate);
    }

    if (endDate) {
      const date = new Date(endDate);
      date.setDate(date.getDate() + 1);

      where.scannedAt.lte = date;
    }
  }

  if (search) {
    where.OR = [
      {
        admin: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        order: {
          orderNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        order: {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  const [logs, total] = await Promise.all([
    prisma.scanLog.findMany({
      where,

      include: {
        admin: {
          select: {
            id: true,
            name: true,
          },
        },

        order: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                employeeId: true,
                gender: true,
              },
            },
          },
        },
      },

      skip: (page - 1) * limit,

      take: limit,

      orderBy: {
        scannedAt: "desc",
      },
    }),

    prisma.scanLog.count({
      where,
    }),
  ]);

  return {
    logs,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};