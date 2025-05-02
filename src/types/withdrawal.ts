
import { LucideIcon } from "lucide-react";

export interface WithdrawalMethod {
  id: string;
  name: string;
  icon: LucideIcon;
  fee: string;
  minAmount: number;
  processingTime: string;
}
