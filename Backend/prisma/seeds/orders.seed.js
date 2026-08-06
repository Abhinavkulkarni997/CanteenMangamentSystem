import crypto from "crypto";

export default async function seedOrders(prisma) {
  console.log("🛒 Seeding Orders...");

  // Remove old data
  await prisma.scanLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  const menus = await prisma.menuItem.findMany();

  if (!users.length || !menus.length) {
    throw new Error("Users/Menu not found. Seed them first.");
  }

  const groupedMenus = {};

  menus.forEach((menu) => {
    const key = `${menu.menuDate.toISOString().split("T")[0]}-${menu.sessionType}`;

    if (!groupedMenus[key]) groupedMenus[key] = [];

    groupedMenus[key].push(menu);
  });

  const sessions = ["BREAKFAST", "LUNCH", "DINNER"];

  let orderCounter = 1;

  for (let day = 0; day < 7; day++) {
    const date = new Date();

    date.setDate(date.getDate() + day);

    const dayString = date.toISOString().split("T")[0];

    for (const session of sessions) {
      const menu = groupedMenus[`${dayString}-${session}`];

      if (!menu) continue;

      for (let i = 0; i < 8; i++) {
        const user = users[Math.floor(Math.random() * users.length)];

        const order = await prisma.order.create({
          data: {
            orderNumber: `NGRI-${dayString.replaceAll("-", "")}-${String(orderCounter).padStart(6, "0")}`,
            userId: user.id,
            paymentStatus: Math.random() < 0.95 ? "SUCCESS" : "FAILED",
            orderStatus:
              Math.random() < 0.7
                ? "COLLECTED"
                : Math.random() < 0.9
                ? "BOOKED"
                : "CANCELLED",
            qrToken: crypto.randomBytes(16).toString("hex"),
            totalAmount: 0,
          },
        });

        let total = 0;

        const selected = [...menu]
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 2);

        for (const item of selected) {
          const qty = Math.floor(Math.random() * 3) + 1;

          const itemTotal = Number(item.price) * qty;

          total += itemTotal;

          await prisma.orderItem.create({
            data: {
              orderId: order.id,
              menuItemId: item.id,
              quantity: qty,
              unitPrice: item.price,
              totalPrice: itemTotal,
            },
          });
        }

        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            totalAmount: total,
            createdAt: date,
            updatedAt: date,
            collectedAt:
              order.orderStatus === "COLLECTED"
                ? new Date(date.getTime() + 1000 * 60 * 30)
                : null,
          },
        });

        orderCounter++;
      }
    }
  }

  console.log(`✅ ${orderCounter - 1} Orders Seeded`);
}