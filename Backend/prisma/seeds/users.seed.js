import bcrypt from "bcryptjs";

export default async function seedUsers(prisma) {
  console.log(" Seeding Users...");

  // Clear existing data
  await prisma.scanLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("Password@123", 10);

  const users = [];

  // -------------------------
  // Super Admin
  // -------------------------

  users.push({
    name: "Super Admin",
    mobile: "9000000001",
    email: "superadmin@ngri.res.in",
    password,
    employeeId: "NGRI0001",
    designation: "Director",
    division: "Administration",
    role: "SUPER_ADMIN",
    userType: "EMPLOYEE",
  });

  // -------------------------
  // Admin
  // -------------------------

  users.push({
    name: "Admin",
    mobile: "9000000002",
    email: "admin@ngri.res.in",
    password,
    employeeId: "NGRI0002",
    designation: "Administrative Officer",
    division: "Administration",
    role: "ADMIN",
    userType: "EMPLOYEE",
  });

  // -------------------------
  // Scientists
  // -------------------------

  for (let i = 1; i <= 10; i++) {
    users.push({
      name: `Scientist ${i}`,
      mobile: `91000000${String(i).padStart(2, "0")}`,
      email: `scientist${i}@ngri.res.in`,
      password,
      employeeId: `SCI${1000 + i}`,
      designation: "Scientist",
      division: "Geophysics",
      role: "USER",
      userType: "EMPLOYEE",
    });
  }

  // -------------------------
  // Project Staff
  // -------------------------

  for (let i = 1; i <= 5; i++) {
    users.push({
      name: `Project Staff ${i}`,
      mobile: `92000000${String(i).padStart(2, "0")}`,
      email: `project${i}@ngri.res.in`,
      password,
      employeeId: `PROJ${100 + i}`,
      designation: "Project Associate",
      division: "Research",
      role: "USER",
      userType: "PROJECT_STAFF",
    });
  }

  // -------------------------
  // Contract Employees
  // -------------------------

  for (let i = 1; i <= 5; i++) {
    users.push({
      name: `Contract Staff ${i}`,
      mobile: `93000000${String(i).padStart(2, "0")}`,
      email: `contract${i}@ngri.res.in`,
      password,
      employeeId: `CONT${100 + i}`,
      designation: "Contract Employee",
      division: "Maintenance",
      role: "USER",
      userType: "CONTRACT",
    });
  }

  // -------------------------
  // Students
  // -------------------------

  for (let i = 1; i <= 3; i++) {
    users.push({
      name: `Student ${i}`,
      mobile: `94000000${String(i).padStart(2, "0")}`,
      email: `student${i}@ngri.res.in`,
      password,
      employeeId: `STU${100 + i}`,
      designation: "Research Student",
      division: "Academics",
      role: "USER",
      userType: "STUDENT",
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log(` ${users.length} Users Seeded`);
}