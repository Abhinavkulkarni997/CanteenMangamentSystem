// import { useState } from "react";
// import { useWallet, useWalletTransactions } from "../../hooks/useWallet";
// import WalletBalanceCard from "../../components/wallet/WalletBalanceCard";
// import WalletTransactionsTable from "../../components/wallet/WalletTransactionsTable";
// import UserSearch from "../../components/wallet/UserSearch";
// import CreditWalletDialog from "../../components/wallet/CreditWalletDialog";
// import 

// const Wallet = () => {
//   const [selectedUserId, setSelectedUserId] = useState<number>();
//   const [creditOpen, setCreditOpen] = useState(false);
//   const [debitOpen, setDebitOpen] = useState(false);

//   const {
//     data: wallet,
//     isLoading: walletLoading,
//   } = useWallet(selectedUserId);

//   const {
//     data: transactionData,
//     isLoading: transactionLoading,
//   } = useWalletTransactions(selectedUserId);

//   return (
//     <div className="space-y-6">
//       <div className="rounded-lg bg-white p-6 shadow">
//         <h1 className="mb-4 text-2xl font-bold">
//           Wallet Management
//         </h1>

//         <UserSearch
//           onSelect={(id) => setSelectedUserId(id)}
//         />
//       </div>

//       {walletLoading && (
//         <div className="rounded-lg bg-white p-6 shadow">
//           Loading wallet...
//         </div>
//       )}

//       {wallet && <WalletBalanceCard wallet={wallet} 
//       onCredit={() => setCreditOpen(true)}
//       onDebit={() => setDebitOpen(true)}
//       />}

//       {transactionData && (
//         <WalletTransactionsTable
//           loading={transactionLoading}
//           transactions={transactionData.transactions}
//         />
//       )}
//       {selectedUserId && (
//   <>
//     <CreditWalletDialog
//       open={creditOpen}
//       onClose={() => setCreditOpen(false)}
//       userId={selectedUserId}
//     />

//     <DebitWalletDialog
//       open={debitOpen}
//       onClose={() => setDebitOpen(false)}
//       userId={selectedUserId}
//       balance={Number(wallet.balance)}
//     />
//   </>
// )}
// <WalletBalanceCard
//   wallet={wallet}
//   onCredit={() => setCreditOpen(true)}
//   onDebit={() => setDebitOpen(true)}
// />
//     </div>
//   );
// };

// export default Wallet;


import { useState } from "react";
import { useWallet, useWalletTransactions } from "../../hooks/useWallet";
import WalletBalanceCard from "../../components/wallet/WalletBalanceCard";
import WalletTransactionsTable from "../../components/wallet/WalletTransactionsTable";
import UserSearch from "../../components/wallet/UserSearch";
import CreditWalletDialog from "../../components/wallet/CreditWalletDialog";
import DebitWalletDialog from "../../components/wallet/DebitWalletDialog";

const Wallet = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [creditOpen, setCreditOpen] = useState(false);
  const [debitOpen, setDebitOpen] = useState(false);

  const {
    data: wallet,
    isLoading: walletLoading,
  } = useWallet(selectedUserId);

  const {
    data: transactionData,
    isLoading: transactionLoading,
  } = useWalletTransactions(selectedUserId);

  return (
    <div className="space-y-6">

      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">
          Wallet Management
        </h1>

        <UserSearch
          onSelect={setSelectedUserId}
        />
      </div>

      {walletLoading && (
        <div className="rounded-lg bg-white p-6 shadow">
          Loading wallet...
        </div>
      )}

      {wallet && (
        <WalletBalanceCard
          wallet={wallet}
          onCredit={() => setCreditOpen(true)}
          onDebit={() => setDebitOpen(true)}
        />
      )}

      {transactionData && (
        <WalletTransactionsTable
          loading={transactionLoading}
          transactions={transactionData.transactions}
        />
      )}

      {selectedUserId && wallet && (
        <>
          <CreditWalletDialog
            open={creditOpen}
            onClose={() => setCreditOpen(false)}
            userId={selectedUserId}
          />

          <DebitWalletDialog
            open={debitOpen}
            onClose={() => setDebitOpen(false)}
            userId={selectedUserId}
            balance={Number(wallet.balance)}
          />
        </>
      )}

    </div>
  );
};

export default Wallet;