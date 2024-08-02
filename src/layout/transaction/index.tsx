import { TransactionTable, WalletModal } from "../../components";

export const TransactionLayout = () => {
  return (
    <div className="p-5 border border-gray-200 rounded-lg ">
        <div className="self-end py-4"><WalletModal/></div>
      <TransactionTable />
    </div>
  );
};
