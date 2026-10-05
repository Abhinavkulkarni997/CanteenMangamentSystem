import prisma from "../config/prisma.js";

// The below findUserByMobile is commented as user logged in through mobile number and we are writing new function to update for logged in through email for admin
// export const findUserByMobile=async(mobile)=>{
//     return await prisma.user.findUnique({
//         where:{
//             mobile
//         }
//     });
// };

// the new function findUserForLogin is used so that user can login through mobile no for app and email for admin portal
export const findUserForLogin=({
    mobile,
    email,
})=>{
    return prisma.user.findFirst({
        where:{
            OR:[
                ...(mobile ? [{mobile}]:[]),
                ...(email ? [{email}] : [])
            ]
        }
    });
}

export const findUserByEmployeeId=async(employeeId)=>{
      if (!employeeId) return null;
    return await prisma.user.findUnique({
        where:{
            employeeId
        }
    });
};

export const createUser=async(userData)=>{
    return await prisma.user.create({
        data:userData
    });
};
export const findUserById = async (id) => {

    return await prisma.user.findUnique({
        where: {
            id
        },
        select:{
             id: true,
            name: true,
            email: true,
            mobile: true,
            gender: true,
            employeeId: true,
            projectStaffId: true,
            designation: true,
            division: true,
            photoUrl: true,
            role: true,
            userType: true,

             // Needed for Change Password
            password: true,
            forcePasswordChange: true,
            isActive: true

        }
    });

};
export const updatePassword = (
  id,
  hashedPassword
) => {

  return prisma.user.update({

    where: {
      id: Number(id),
    },

    data: {
      password: hashedPassword,
      forcePasswordChange: false,
      passwordChangedAt: new Date(),
      passwordChangedBy: id,
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
export const findUserByEmail = async (email) => {

    if (!email) return null;

    return await prisma.user.findUnique({
        where: {
            email
        }
    });

};
export const findUserByProjectStaffId = async (projectStaffId) => {

    if (!projectStaffId) return null;

    return await prisma.user.findUnique({
        where: {
            projectStaffId
        }
    });

};