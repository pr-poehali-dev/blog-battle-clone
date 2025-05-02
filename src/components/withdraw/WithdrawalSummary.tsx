
import { Button } from "@/components/ui/button";
import { WithdrawalMethod } from "@/types/withdrawal";

interface WithdrawalSummaryProps {
  selectedMethod: WithdrawalMethod;
  amount: string;
  fee: number;
  total: number;
  isValid: boolean;
  onWithdraw: () => void;
}

const WithdrawalSummary = ({
  selectedMethod,
  amount,
  fee,
  total,
  isValid,
  onWithdraw,
}: WithdrawalSummaryProps) => {
  return (
    <div className="flex flex-col items-stretch space-y-4">
      <div className="flex justify-between text-sm">
        <span>Комиссия ({selectedMethod.fee}):</span>
        <span>-{fee} ₽</span>
      </div>
      <div className="flex justify-between font-medium">
        <span>Итого к получению:</span>
        <span>{total} ₽</span>
      </div>
      <Button 
        className="w-full text-lg py-6" 
        size="lg"
        onClick={onWithdraw}
        disabled={!isValid}
      >
        Вывести средства
      </Button>
    </div>
  );
};

export default WithdrawalSummary;
