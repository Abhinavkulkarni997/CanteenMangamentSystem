import * as repository from "../repositories/wallet.repository.js";
import ApiError from "../utils/responses/ApiError.js";
import { generateReferenceId } from "../utils/generateReferenceId.js";
export const getWallet = async (userId) => {
  let wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    wallet = await repository.createWallet(userId);

    wallet = await repository.findWalletByUserId(userId);
  }

  return wallet;
};

export const creditWallet = async ({
  userId,
  amount,
  remarks,
  createdBy,
  
}) => {
  amount = Number(amount);

  if (amount <= 0) {
    throw new ApiError(400, "Amount must be greater than zero");
  }

  let wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    wallet = await repository.createWallet(userId);
  }
  const referenceId = generateReferenceId("ADMIN");

  return repository.creditWallet({
    walletId: wallet.id,
    amount,
    remarks,
    createdBy,
    referenceId
  });
};

export const debitWallet = async ({
  userId,
  amount,
  remarks,
  createdBy,

  orderId,
}) => {
  amount = Number(amount);

  if (amount <= 0) {
    throw new ApiError(400, "Amount must be greater than zero");
  }

  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }
 const referenceId =  generateReferenceId("ADMIN");

  return repository.debitWallet({
    walletId: wallet.id,
    amount,
    remarks,
    createdBy,
    referenceId,
    orderId,
  });
};

export const getWalletTransactions = async (
  userId,
  page = 1,
  limit = 10
) => {
  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }

  const transactions =
    await repository.getWalletTransactions(
      wallet.id,
      page,
      limit
    );

  const total =
    await repository.transactionCount(wallet.id);

  return {
    transactions,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

// export const getWalletBalance = async (userId) => {
//   const wallet = await repository.findWalletByUserId(userId);

//   if (!wallet) {
//     return {
//       balance: 0,
//     };
//   }

//   return {
//     balance: wallet.balance,
//   };
// };


// above getWalletBalance is working but improved version is developed 
export const getWalletBalance = async (userId) => {

    const wallet = await getWallet(userId);

    return {
        balance: wallet.balance,
    };

};