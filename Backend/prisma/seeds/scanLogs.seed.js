export default async function seedScanLogs(prisma) {
  console.log("📱 Seeding Scan Logs...");

  await prisma.scanLog.deleteMany();

  // Get collected orders only
  const orders = await prisma.order.findMany({
    where: {
      orderStatus: "COLLECTED",
    },
  });

  // Get admins
  const admins = await prisma.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "SUPER_ADMIN"],
      },
    },
  });

  if (!orders.length || !admins.length) {
    console.log("⚠️ No collected orders or admins found.");
    return;
  }

  const devices = [
    "Chrome - Windows",
    "Android Scanner",
    "Edge - Windows",
    "Firefox - Linux",
  ];

  const ips = [
    "192.168.1.10",
    "192.168.1.11",
    "192.168.1.12",
    "192.168.1.13",
  ];

  const logs = [];

  for (const order of orders) {
    const admin =
      admins[Math.floor(Math.random() * admins.length)];

    logs.push({
      orderId: order.id,
      adminId: admin.id,
      scannedAt: order.collectedAt ?? new Date(),
      device:
        devices[Math.floor(Math.random() * devices.length)],
      ipAddress:
        ips[Math.floor(Math.random() * ips.length)],
    });
  }

  await prisma.scanLog.createMany({
    data: logs,
  });

  console.log(`✅ ${logs.length} Scan Logs Seeded`);
}