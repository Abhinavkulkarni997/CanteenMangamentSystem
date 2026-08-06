// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// const prisma=new PrismaClient();
// async function main(){
//     const exisitingAdmin=await prisma.user.findFirst({
//         where:{
//             email:"canteen@ngri.res.in"
//             //   email:"admin@ngri.res.in"
//         }
//     });

//     if(exisitingAdmin){
//         console.log("Admin already exists");
//         return;
//     }

//     const hashedPassword=await bcrypt.hash(
//         "Admin@1234",
//         10
//     );

//     await prisma.user.create({
//         // data:{
//         //     name:"Super Admin",
//         //     email:"admin@ngri.res.in",
//         //     mobile:"9999999999",
//         //     password:hashedPassword,
//         //     employeeId:"ADMIN001",
//         //     designation:"System Administrator",
//         //     division:"IT",
//         //     photoUrl:"admin.jpg",
//         //     role:"ADMIN",
//         //     userType:"PROJECT_STAFF",
//         //     isActive:true
//         // }
//        data:{
//         name:"Canteen Admin",
//         email:"canteen@ngri.res.in",
//         mobile:"9999999998",
//         password:hashedPassword,
//         employeeId:"ADMIN002",
//         designation:"System Administrator",
//         division:"IT",
//         photoUrl:"admin.jpg",
//         role:"ADMIN",
//         userType:"PROJECT_STAFF",
//         isActive:true
//         }
//     });
//     console.log("Admin created successfully.");
// }
// main().then(
//     async ()=>{
//         await prisma.$disconnect();
//     }
// ).catch(async(e)=>{
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
// });

import { PrismaClient } from "@prisma/client";

import seedUsers from "./seeds/users.seed.js";
 import seedMenu from "./seeds/menu.seed.js";
import seedOrders from "./seeds/orders.seed.js";
import seedScanLogs from "./seeds/scanLogs.seed.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  await seedUsers(prisma);
   await seedMenu(prisma);
 await seedOrders(prisma);
  await seedScanLogs(prisma);

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });