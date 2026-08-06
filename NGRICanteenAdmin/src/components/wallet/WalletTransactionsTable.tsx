import { type WalletTransaction } from "../../types/wallet";

interface Props {
  transactions: WalletTransaction[];
  loading: boolean;
}

const WalletTransactionsTable = ({
  transactions,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="rounded-lg bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>

              <th className="px-4 py-3 text-left">Type</th>

              <th className="px-4 py-3 text-left">Amount</th>

              <th className="px-4 py-3 text-left">Admin</th>

              <th className="px-4 py-3 text-left">Reference</th>

              <th className="px-4 py-3 text-left">Order No.</th>

              <th className="px-4 py-3 text-left">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-500"
                >
                  No wallet transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {new Date(
                      transaction.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.type === "CREDIT"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td
                    className={`px-4 py-3 font-semibold ${
                      transaction.type === "CREDIT"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "CREDIT" ? "+" : "-"}₹
                    {transaction.amount}
                  </td>

                  <td className="px-4 py-3">
                    {transaction.admin?.name ?? "System"}
                  </td>

                  <td className="px-4 py-3 font-mono text-sm">
                    {transaction.referenceId}
                  </td>

                  <td className="px-4 py-3">
                    {transaction.order?.orderNumber ?? "—"}
                  </td>

                  <td className="px-4 py-3">
                    {transaction.remarks || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletTransactionsTable;