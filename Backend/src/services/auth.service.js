import prisma from "../config/prisma.js";
import ApiError from "../utils/responses/ApiError.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt/generateToken.js";
import {
    // findUserByMobile,
    findUserForLogin,
    findUserByEmployeeId,
    // createUser,
    findUserById,
    updatePassword,
  
    findUserByEmail,
    findUserByProjectStaffId,
   
    
} from "../repositories/auth.repository.js";

// export const registerUser = async (userData) => {

//     // const existingMobile = await findUserByMobile(userData.mobile);
//     const existingMobile = await findUserForLogin({mobile:userData.mobile});

//     if (existingMobile) {
//         throw new ApiError(409,"Mobile number already exists");
//     }

//     if (userData.employeeId) {

//         const existingEmployee = await findUserByEmployeeId(userData.employeeId);

//         if (existingEmployee) {
//             throw new ApiError(409,"Employee ID already exists");
//         }

//     }

//     const hashedPassword = await bcrypt.hash(userData.password, 10);

//     userData.password = hashedPassword;

//     return await createUser(userData);

// };




// export const loginUser = async (
//     mobile,
//     password
// ) => {

//     const user = await findUserByMobile(mobile);

//     if (!user) {

//         throw new ApiError(
//             404,
//             "User not found"
//         );

//     }
//     if (!user.isActive) {
//     throw new ApiError(
//         403,
//         "Your account has been deactivated. Please contact the administrator."
//     );
// }

//     const isPasswordCorrect =
//         await bcrypt.compare(
//             password,
//             user.password
//         );

//     if (!isPasswordCorrect) {

//         throw new ApiError(
//             401,
//             "Invalid mobile number or password"
//         );

//     }

//     const token = generateToken(user);

//     return {
//         user,
//         token
//     };

// };

export const registerUser = async (userData) => {

    const existingMobile = await findUserForLogin({
        mobile: userData.mobile,
    });

    if (existingMobile) {
        throw new ApiError(409, "Mobile number already exists");
    }
    //------------------------------------------------
// Email Validation
//------------------------------------------------

if (userData.email) {

    const existingEmail = await findUserByEmail(
        userData.email
    );

    if (existingEmail) {

        throw new ApiError(
            409,
            "Email already exists"
        );

    }

}


    if (userData.employeeId) {

        const existingEmployee = await findUserByEmployeeId(
            userData.employeeId
        );

        if (existingEmployee) {
            throw new ApiError(409, "Employee ID already exists");
        }

    }
    //------------------------------------------------
// Project Staff ID Validation
//------------------------------------------------

if (userData.projectStaffId) {

    const existingProjectStaff =
        await findUserByProjectStaffId(
            userData.projectStaffId
        );

    if (existingProjectStaff) {

        throw new ApiError(
            409,
            "Project Staff ID already exists"
        );

    }

}
    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    userData.password = hashedPassword;

    return await prisma.$transaction(async (tx) => {

        const createdUser = await tx.user.create({
            data: userData,
        });

        await tx.wallet.create({
            data: {
                userId: createdUser.id,
            },
        });

        return createdUser;

    });

};
export const loginUser = async (
   body
) => {
    const {mobile,email,password}=body;

    // const user = await findUserByMobile(mobile);
    const user = await findUserForLogin({
        mobile,
        email
    });

    if (!user) {

        throw new ApiError(
            404,
            "User not found"
        );

    }
    if (!user.isActive) {
    throw new ApiError(
        403,
        "Your account has been deactivated. Please contact the administrator."
    );
}

    const isPasswordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordCorrect) {

        throw new ApiError(
            401,
            "Invalid Credentials"
        );

    }

    const token = generateToken(user);
    if (user.forcePasswordChange) {
  return {
    token,
    forcePasswordChange: true,
    user,
  };
}

    return {
        user,
         forcePasswordChange: false,
        token
    };

};


export const getProfile = async (id) => {

    const user = await findUserById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;

};


export const changePassword = async (
  loggedInUserId,
  payload
) => {
console.log("Logged in User ID:", loggedInUserId);
  const user =
    await findUserById(loggedInUserId);
    console.log("DB User:", {
  id: user.id,
  email: user.email,
  mobile: user.mobile,
  password: user.password,
});

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  console.log("Old Password:", payload.oldPassword);
console.log("Hashed Password:", user.password);
  const isOldPasswordCorrect =
    await bcrypt.compare(
      payload.oldPassword,
      user.password
    );
    console.log("Password Match:", isOldPasswordCorrect);

  if (!isOldPasswordCorrect) {
    throw new ApiError(
      400,
      "Old password is incorrect"
    );
  }

  const isSamePassword =
    await bcrypt.compare(
      payload.newPassword,
      user.password
    );

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password must be different from the old password"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      payload.newPassword,
      10
    );

  return updatePassword(
    loggedInUserId,
    hashedPassword
  );

};