import {type Wallet } from "../../types/wallet";

interface Props {
  wallet: Wallet;
  onCredit: () => void;
  onDebit: () => void;
}

const WalletBalanceCard = ({
  wallet,
  onCredit,
  onDebit,
}: Props) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            {wallet.user.name}
          </h2>

         <p className="text-gray-500">
  Employee / Project Staff ID :{" "}
  {wallet.user.employeeId ||
   wallet.user.projectStaffId ||
   "-"}
</p>

          <p className="text-gray-500">
            Mobile : {wallet.user.mobile}
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-500">
            Wallet Balance
          </p>

          <h1 className="text-4xl font-bold text-green-600">
            ₹{wallet.balance}
          </h1>

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={onCredit}
          className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          + Credit Wallet
        </button>

        <button
          onClick={onDebit}
          className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          - Debit Wallet
        </button>

      </div>

    </div>
  );
};

export default WalletBalanceCard;