import { Download } from "lucide-react";
 import * as reportService from "../../services/report";
export default function ExportButtons() {
   

const handleExcel = async () => {
  const response = await reportService.exportExcel();

  const url = window.URL.createObjectURL(response.data);

  const link = document.createElement("a");

  link.href = url;

  link.download = "orders-report.xlsx";

  link.click();

  window.URL.revokeObjectURL(url);
};
  return (
    <div className="flex justify-end gap-3 mb-4">

      <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleExcel}>
        <Download size={18} />
        Excel
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Download size={18} />
        PDF
      </button>

    </div>
  );
}