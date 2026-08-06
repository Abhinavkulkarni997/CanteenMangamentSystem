const breakfastItems = [
  { itemName: "Idli", price: 20 },
  { itemName: "Vada", price: 15 },
  { itemName: "Dosa", price: 35 },
  { itemName: "Poori", price: 30 },
  { itemName: "Upma", price: 20 },
  { itemName: "Tea", price: 10 },
  { itemName: "Coffee", price: 15 },
];

const lunchItems = [
  { itemName: "Rice", price: 5 },
  { itemName: "Sambar", price: 5 },
  { itemName: "Dal", price: 5 },
  { itemName: "Curry", price: 10 },
  { itemName: "Special Curry", price: 15 },
  { itemName: "Papad", price: 2 },
  { itemName: "Curd", price: 5 },
  { itemName: "Sweet", price: 10 },
];

const dinnerItems = [
  { itemName: "Chapati", price: 10 },
  { itemName: "Rice", price: 5 },
  { itemName: "Dal", price: 5 },
  { itemName: "Curry", price: 10 },
  { itemName: "Paneer Curry", price: 20 },
  { itemName: "Egg Curry", price: 20 },
];

export default async function seedMenu(prisma) {

  console.log("🍛 Seeding Menu...");

  await prisma.menuItem.deleteMany();

  const menus = [];

  for (let day = 0; day < 7; day++) {

    const menuDate = new Date();

    menuDate.setDate(menuDate.getDate() + day);

    menuDate.setHours(0, 0, 0, 0);

    breakfastItems.forEach(item => {

      menus.push({
        ...item,
        sessionType: "BREAKFAST",
        menuDate,
        isAvailable: true,
      });

    });

    lunchItems.forEach(item => {

      menus.push({
        ...item,
        sessionType: "LUNCH",
        menuDate,
        isAvailable: true,
      });

    });

    dinnerItems.forEach(item => {

      menus.push({
        ...item,
        sessionType: "DINNER",
        menuDate,
        isAvailable: true,
      });

    });

  }

  await prisma.menuItem.createMany({
    data: menus,
  });

  console.log(`✅ ${menus.length} Menu Items Seeded`);

}