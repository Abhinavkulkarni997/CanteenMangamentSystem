

const userResponse = (user) => {

    return {

        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        employeeId: user.employeeId,
        projectStaffId: user.projectStaffId,
        designation: user.designation,
        division: user.division,
        photoUrl: user.photoUrl,
        role: user.role,
        userType: user.userType,
        isActive: user.isActive,
        createdAt: user.createdAt

    };

};

export default userResponse;