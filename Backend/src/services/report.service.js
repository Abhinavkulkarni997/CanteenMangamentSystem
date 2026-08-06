import * as repository from "../repositories/report.repository.js";
import ExcelJS from "exceljs";

export const report = async (query) => {
  let { startDate, endDate } = query;

  if (!startDate || !endDate) {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
  } else {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate.setDate(endDate.getDate() + 1);
  }

  const [summary, revenue,meals,orders] = await Promise.all([
  repository.reportSummary(startDate, endDate),
  repository.revenueReport(startDate, endDate),
  repository.mealReport(startDate, endDate),

   repository.reportOrders({
    page: query.page,
    limit: query.limit,
    search: query.search,
    status: query.status,
    startDate,
    endDate,
  }),

]);

return {
  summary,
  revenue,
  meals,
  orders
};
};


export const exportExcel = async (query) => {
  let { startDate, endDate } = query;

  if (!startDate || !endDate) {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
  } else {
    startDate = new Date(startDate);

    endDate = new Date(endDate);
    endDate.setDate(endDate.getDate() + 1);
  }

  const result = await repository.reportOrders({
    page: 1,
    limit: 100000,
    search: query.search,
    status: query.status,
    startDate,
    endDate,
  });

  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Orders Report");

  sheet.columns = [
    { header: "Order No", key: "orderNumber", width: 25 },
    { header: "Employee", key: "employee", width: 25 },
    { header: "Items", key: "items", width: 40 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Date", key: "date", width: 20 },
  ];

  result.orders.forEach((order) => {
    sheet.addRow({
      orderNumber: order.orderNumber,
      employee: order.user?.name ?? "Guest",
      items: order.items
        .map((i) => i.menuItem.itemName)
        .join(", "),
      amount: Number(order.totalAmount),
      status: order.orderStatus,
      date: order.createdAt,
    });
  });

  return workbook;
};