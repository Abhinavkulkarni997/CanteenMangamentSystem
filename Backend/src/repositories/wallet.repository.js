import prisma from "../config/prisma.js";
import ApiError from "../utils/responses/ApiError.js";

/**
 * Get wallet by userId
 */
// export const findWalletByUserId = async (userId) => {
//   return prisma.wallet.findUnique({
//     where: {
//       userId: Number(userId),
//     },
//     include: {
//       transactions: {
//         orderBy: {
//           createdAt: "desc",
//         },
//       },
//     },
//   });
// };
export const findWalletByUserId = async (userId) => {
  return prisma.wallet.findUnique({
    where: {
      userId: Number(userId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          employeeId: true,
          projectStaffId: true,
          mobile: true,
       
        },
      },
    },
  });
};
/**
 * Get wallet by walletId
 */
export const findWalletById = async (walletId) => {
  return prisma.wallet.findUnique({
    where: {
      id: Number(walletId),
    },
  });
};

/**
 * Create wallet
 */
export const createWallet = async (userId) => {
  return prisma.wallet.create({
    data: {
      userId: Number(userId),
    },
  });
};

/**
 * Credit wallet
 */

// export const creditWallet = async ({
//   walletId,
//   amount,
//   remarks,
//   createdBy,
//   referenceId,
// }) => {
//   return prisma.$transaction(async (tx) => {

//     const wallet = await tx.wallet.update({
//       where: {
//         id: walletId,
//       },
//       data: {
//         balance: {
//           increment: amount,
//         },
//       },
//     });

//     await tx.walletTransaction.create({
//       data: {
//         walletId,

//         amount,

//         type: "CREDIT",

//         status: "SUCCESS",

//         remarks,

//         referenceId,

//         createdBy,
//       },
//     });

//     return wallet;
//   });
// };


export const creditWallet = async ({
  walletId,
  amount,
  remarks,
  createdBy,
  referenceId,
}) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.update({
      where: {
        id: walletId,
      },

      data: {
        balance: {
          increment: amount,
        },
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId,

        amount,

        type: "CREDIT",

        status: "SUCCESS",

        remarks,

        referenceId,

        createdBy,
      },
    });

    return wallet;
  });
};

/**
 * Debit wallet
 */



// export const debitWallet = async ({
//   walletId,
//   amount,
//   remarks,
//   createdBy,
//   referenceId,
// }) => {
//   return prisma.$transaction(async (tx) => {

//     const wallet = await tx.wallet.findUnique({
//       where: {
//         id: walletId,
//       },
//     });

//     if (!wallet) {
//       throw new Error("Wallet not found");
//     }

//     if (Number(wallet.balance) < Number(amount)) {
//       throw new Error("Insufficient wallet balance");
//     }

//     const updatedWallet = await tx.wallet.update({
//       where: {
//         id: walletId,
//       },
//       data: {
//         balance: {
//           decrement: amount,
//         },
//       },
//     });

//     await tx.walletTransaction.create({
//       data: {
//         walletId,

//         amount,

//         type: "DEBIT",

//         status: "SUCCESS",

//         remarks,

//         referenceId,

//         createdBy,
//       },
//     });

//     return updatedWallet;
//   });
// };

export const debitWallet = async ({
  walletId,
  amount,
  remarks,
  createdBy,
 referenceId,
  orderId,
}) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({
      where: {
        id: walletId,
      },
      select: {
    id: true,
    balance: true,
  },
    });

    if (!wallet) {
      throw new ApiError(404,"Wallet not found");
    }

    if (Number(wallet.balance) < Number(amount)) {
      throw new ApiError(400,"Insufficient wallet balance");
    }

    const updatedWallet = await tx.wallet.update({
      where: {
        id: walletId,
      },

      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId,

        amount,

        type: "DEBIT",

        status: "SUCCESS",

        remarks,

        referenceId,

        createdBy,

        orderId,
      },
    });

    return updatedWallet;
  });
};


// export const getWalletTransactions = async (
//   walletId,
//   page = 1,
//   limit = 10
// ) => {
//   return prisma.walletTransaction.findMany({
//     where: {
//       walletId,
//     },

//     include: {
//       admin: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },

//       order: {
//         select: {
//           id: true,
//           orderNumber: true,
//         },
//       },
//     },

//     orderBy: {
//       createdAt: "desc",
//     },

//     skip: (page - 1) * limit,

//     take: limit,
//   });
// };

export const getWalletTransactions = async (
  walletId,
  page = 1,
  limit = 10
) => {
  return prisma.walletTransaction.findMany({
    where: {
      walletId,
    },

    select: {
         id: true,
            amount: true,
            type: true,
            status: true,
            remarks: true,
            referenceId: true,
            createdAt: true,
      admin: {
        select: {
          id: true,
          name: true,
        },
      },

      order: {
        select: {
          id: true,
          orderNumber: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * limit,

    take: limit,
  });
};
export const transactionCount = async (walletId) => {
  return prisma.walletTransaction.count({
    where: {
      walletId,
    },
  });
};

export const findUserById = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      name: true,
      employeeId: true,
      projectStaffId: true,
      mobile: true,
      isActive: true,
    },
  });
};

export const findWalletByUserIdTx = async (tx, userId) => {

    return tx.wallet.findUnique({

        where: {

            userId: Number(userId)

        },

        select: {

            id: true,

            balance: true

        }

    });

};
export const debitWalletTx = async (
    tx,
    walletId,
    amount
) => {

    return tx.wallet.update({

        where: {

            id: walletId

        },

        data: {

            balance: {

                decrement: amount

            }

        }

    });

};

export const createWalletTransactionTx = async (
    tx,
    data
) => {

    return tx.walletTransaction.create({

        data

    });

};