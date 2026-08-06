import prisma from "../config/prisma.js";
import * as repository from "../repositories/user.repository.js";
import ApiError from "../utils/responses/ApiError.js";
import bcrypt from "bcrypt";
export const getUsers = (query) => {
  return repository.getUsers(query);
};


export const getUserById = async (id) => {
  const user = await repository.getUserById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { _count, ...userData } = user;

  return {
    ...userData,
    ordersCount: _count.orders,
  };
};




// export const createUser = async (payload) => {

//   const mobileExists =
//     await repository.findUserByMobile(payload.mobile);


//     if (payload.email) {
//   const emailExists = await repository.findUserByEmail(payload.email);

//   if (emailExists) {
//     throw new ApiError(400, "Email already exists");
//   }
// }

//   if (mobileExists) {
//     throw new ApiError(
//       400,
//       "Mobile number already exists"
//     );
//   }

//   if (payload.employeeId) {

//     const employeeExists =
//       await repository.findUserByEmployeeId(
//         payload.employeeId
//       );

//     if (employeeExists) {
//       throw new ApiError(
//         400,
//         "Employee ID already exists"
//       );
//     }
//   }

//   const hashedPassword =
//     await bcrypt.hash(payload.password, 10);

//   return repository.createUser({
//     ...payload,
//     password: hashedPassword,
//   });
// };
export const createUser = async (payload) => {

  const mobileExists =
    await repository.findUserByMobile(payload.mobile);

  if (payload.email) {
    const emailExists =
      await repository.findUserByEmail(payload.email);

    if (emailExists) {
      throw new ApiError(400, "Email already exists");
    }
  }

  if (mobileExists) {
    throw new ApiError(
      400,
      "Mobile number already exists"
    );
  }

  if (payload.employeeId) {

    const employeeExists =
      await repository.findUserByEmployeeId(
        payload.employeeId
      );

    if (employeeExists) {
      throw new ApiError(
        400,
        "Employee ID already exists"
      );
    }
  }
  if (payload.projectStaffId) {

  const projectStaffExists =
    await repository.findUserByProjectStaffId(
      payload.projectStaffId
    );

  if (projectStaffExists) {
    throw new ApiError(
      400,
      "Project Staff ID already exists"
    );
  }

}

if (payload.userType === "EMPLOYEE") {
    payload.projectStaffId = null;
}

if (payload.userType === "PROJECT_STAFF") {
    payload.employeeId = null;
}

  const hashedPassword =
    await bcrypt.hash(payload.password, 10);

  return await prisma.$transaction(async (tx) => {

    const user = await tx.user.create({

      data: {
        ...payload,
        password: hashedPassword,
      },

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

    await tx.wallet.create({

      data: {
        userId: user.id,
      },

    });

    return user;

  });

};
export const updateUser = async (id, payload,
     loggedInUser
) => {

  const user = await repository.getUserById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  if (
  payload.email &&
  payload.email !== user.email
) {
  const emailExists = await repository.findUserByEmail(payload.email);

  if (emailExists) {
    throw new ApiError(400, "Email already exists");
  }
}

  if (
    payload.mobile &&
    payload.mobile !== user.mobile
  ) {
    const mobileExists =
      await repository.findUserByMobile(payload.mobile);

    if (mobileExists) {
      throw new ApiError(
        400,
        "Mobile already exists"
      );
    }
  }


  if (
    payload.employeeId &&
    payload.employeeId !== user.employeeId
  ) {
    const employeeExists =
      await repository.findUserByEmployeeId(
        payload.employeeId
      );

    if (employeeExists) {
      throw new ApiError(
        400,
        "Employee ID already exists"
      );
    }
  }
  if (
  payload.projectStaffId &&
  payload.projectStaffId !== user.projectStaffId
) {

  const projectStaffExists =
    await repository.findUserByProjectStaffId(
      payload.projectStaffId
    );

  if (projectStaffExists) {
    throw new ApiError(
      400,
      "Project Staff ID already exists"
    );
  }

}
  if (
    payload.role &&
    payload.userType !== user.userType &&
    loggedInUser.role !== "SUPER_ADMIN"
  ) {
    throw new ApiError(
      403,
      "Only Super Admin can change user roles."
    );
  }
  if (payload.userType === "EMPLOYEE") {
    payload.projectStaffId = null;
}

if (payload.userType === "PROJECT_STAFF") {
    payload.employeeId = null;
}

  return repository.updateUser(id, payload);
};

export const updateUserStatus = async (
  id,
  isActive,
  loggedInUser
) => {

  const user = await repository.getUserById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Rule 1
  if (loggedInUser.id === user.id) {
    throw new ApiError(
      400,
      "You cannot deactivate your own account."
    );
  }

  // Rule 2
  if (
    user.role === "ADMIN" &&
    loggedInUser.role !== "SUPER_ADMIN"
  ) {
    throw new ApiError(
      403,
      "Only Super Admin can change Admin status."
    );
  }

  // Rule 3
  if (
    user.role === "SUPER_ADMIN" &&
    !isActive
  ) {

    const count =
      await repository.countActiveSuperAdmins();

    if (count <= 1) {
      throw new ApiError(
        400,
        "Cannot deactivate the last active Super Admin."
      );
    }
  }

  return repository.updateUserStatus(
    id,
    isActive
  );
};



export const resetPassword = async (
  id,
  payload,
  loggedInUser
) => {

  const user =
    await repository.findUserById(id);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (loggedInUser.id === user.id) {
    throw new ApiError(
      400,
      "Use Change Password instead."
    );
  }

  if (
    user.role === "ADMIN" &&
    loggedInUser.role !== "SUPER_ADMIN"
  ) {
    throw new ApiError(
      403,
      "Only Super Admin can reset an Admin password."
    );
  }

  const samePassword =
    await bcrypt.compare(
      payload.password,
      user.password
    );

  if (samePassword) {
    throw new ApiError(
      400,
      "New password must be different from the current password."
    );
  }

  const hashed =
    await bcrypt.hash(
      payload.password,
      10
    );

  return repository.resetPassword(
    id,
    hashed,
    payload.forcePasswordChange,
    loggedInUser.id
  );

};