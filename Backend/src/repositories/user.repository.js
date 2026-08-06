import prisma from "../config/prisma.js";

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  userType,
  isActive,
}) => {
  page = Math.max(1, Number(page) || 1);
  limit = Math.max(1, Number(limit) || 10);

  const where = {
    ...(role && { role }),

    ...(userType && { userType }),

    ...(isActive !== undefined && {
      isActive: isActive === "true",
    }),

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          employeeId: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          projectStaffId: {
            contains: search,
            mode: "insensitive",  
          },
        },
        {
          mobile: {
            contains: search,
          },
        },
      ],
    }),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,

      where,

      select: {
        id: true,
        name: true,
         email: true,
        mobile: true,
        employeeId: true,
        projectStaffId: true,
        designation: true,
        division: true,
        role: true,
        userType: true,
        isActive: true,
        photoUrl: true,
        createdAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },

    select: {
      id: true,
      name: true,
      email:true,
      mobile: true,
      employeeId: true,
      projectStaffId: true,
      designation: true,
      division: true,
      role: true,
      userType: true,
      photoUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLogin: true,

      _count: {
        select: {
          orders: true,
        },
      },

      orders: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          orderNumber: true,
          totalAmount: true,
          orderStatus: true,
          createdAt: true,
        },
      },
    },
  });
};


export const findUserByEmail = (email) => {
  if (!email) return null;

  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByMobile = (mobile) => {
  return prisma.user.findUnique({
    where: {
      mobile,
    },
  });
};

export const findUserByEmployeeId = (employeeId) => {
  if (!employeeId) return null;

  return prisma.user.findUnique({
    where: {
      employeeId,
    },
  });
};

export const createUser = (data) => {
  return prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
       email: true,
      mobile: true,
      employeeId: true,
      projectStaffId: true,
      designation: true,
      division: true,
      role: true,
      userType: true,
      isActive: true,
      photoUrl: true,
      createdAt: true,
    },
  });
};
export const updateUser = (id, data) => {
  return prisma.user.update({
    where: {
      id: Number(id),
    },

    data,

    select: {
      id: true,
      name: true,
       email: true,
      mobile: true,
      employeeId: true,
      projectStaffId: true,
      designation: true,
      division: true,
      role: true,
      userType: true,
      photoUrl: true,
      isActive: true,
      updatedAt: true,
    },
  });
};

export const updateUserStatus = async (id, isActive) => {
  return prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      isActive,
    },
    select: {
      id: true,
      name: true,
      role: true,
      userType: true,
      isActive: true,
      updatedAt: true,
    },
  });
};

export const countActiveSuperAdmins = () => {
  return prisma.user.count({
    where: {
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });
};

export const resetPassword = (id, password, forcePasswordChange, adminId) => {
  return prisma.user.update({
    where: {
      id: Number(id),
    },

    data: {
      password,
      forcePasswordChange,
      passwordChangedAt: new Date(),
      passwordChangedBy: adminId,
    },

    select: {
      id: true,
      name: true,
      mobile: true,
      forcePasswordChange: true,
      passwordChangedAt: true,
    },
  });
};
export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};
export const findUserByProjectStaffId = (projectStaffId) => {
  if (!projectStaffId) return null;

  return prisma.user.findUnique({
    where: {
      projectStaffId,
    },
  });
};