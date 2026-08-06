// import { useState } from "react";
// import { useCreditWallet } from "../../hooks/useWallet";

// interface Props {
//       open: boolean;
//   onClose: () => void;
//   userId: number;
// }

// const CreditWalletDialog = ({open,
//   onClose,
//   userId,
//  }: Props) => {
   

//   const [amount, setAmount] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [referenceId, setReferenceId] = useState("");

//   const mutation = useCreditWallet(userId);


//     if (!open) return null;

//   const handleSubmit = async () => {
//     if (!amount) return;

//     await mutation.mutateAsync({
//       amount: Number(amount),
//       remarks,
//       referenceId,
//     });

//     setAmount("");
//     setRemarks("");
//     setReferenceId("");

//     alert("Wallet Credited Successfully");
//   };

//   return (
//     <div className="rounded-lg border p-4">

//       <h3 className="mb-4 text-lg font-semibold">
//         Credit Wallet
//       </h3>

//       <input
//         className="mb-3 w-full rounded border p-2"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <input
//         className="mb-3 w-full rounded border p-2"
//         placeholder="Remarks"
//         value={remarks}
//         onChange={(e) => setRemarks(e.target.value)}
//       />

//       <input
//         className="mb-3 w-full rounded border p-2"
//         placeholder="Reference ID"
//         value={referenceId}
//         onChange={(e) => setReferenceId(e.target.value)}
//       />

//       <button
//         onClick={handleSubmit}
//         className="rounded bg-green-600 px-5 py-2 text-white"
//       >
//         Credit Wallet
//       </button>
//     </div>
//   );
// };

// export default CreditWalletDialog;
import { useState } from "react";
import { useCreditWallet } from "../../hooks/useWallet";

interface Props {
  open: boolean;
  onClose: () => void;
  userId: number;
}

const CreditWalletDialog = ({
  open,
  onClose,
  userId,
}: Props) => {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  

  const mutation = useCreditWallet(userId);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!amount) return;

    await mutation.mutateAsync({
      amount: Number(amount),
      remarks,
      
    });

    setAmount("");
    setRemarks("");
   

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Credit Wallet</h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

       

        <div className="mt-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={mutation.isPending}
            onClick={handleSubmit}
            className="rounded bg-green-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {mutation.isPending
              ? "Crediting..."
              : "Credit Wallet"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreditWalletDialog;