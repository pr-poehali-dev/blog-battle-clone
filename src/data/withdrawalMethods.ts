
import { CreditCard, Wallet } from "lucide-react";
import { WithdrawalMethod } from "@/types/withdrawal";

export const withdrawalMethods: WithdrawalMethod[] = [
  { id: "card", name: "Банковская карта", icon: CreditCard, fee: "2%", minAmount: 1000, processingTime: "1-3 дня" },
  { id: "qiwi", name: "QIWI", icon: Wallet, fee: "1.5%", minAmount: 500, processingTime: "Моментально" },
  { id: "webmoney", name: "WebMoney", icon: Wallet, fee: "1%", minAmount: 750, processingTime: "До 24 часов" },
];
