
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";
import { WithdrawalMethod } from "@/types/withdrawal";

interface WithdrawalMethodContentProps {
  method: WithdrawalMethod;
  amount: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cardNumber: string;
  handleCardNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  walletNumber: string;
  handleWalletNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithdrawalMethodContent = ({
  method,
  amount,
  handleAmountChange,
  cardNumber,
  handleCardNumberChange,
  walletNumber,
  handleWalletNumberChange,
}: WithdrawalMethodContentProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium mb-2">Сумма вывода</h3>
        <Input 
          type="text" 
          placeholder={`Минимальная сумма: ${method.minAmount} ₽`}
          value={amount}
          onChange={handleAmountChange}
          className="bg-background text-lg h-12"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">
          {method.id === "card" ? "Номер карты" : "Номер кошелька"}
        </h3>
        {method.id === "card" ? (
          <Input 
            type="text" 
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="bg-background"
            maxLength={19}
          />
        ) : (
          <Input 
            type="text" 
            placeholder={`Введите номер ${method.id === "qiwi" ? "QIWI" : "WebMoney"} кошелька`}
            value={walletNumber}
            onChange={handleWalletNumberChange}
            className="bg-background"
          />
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Время обработки: {method.processingTime}
        </span>
      </div>
    </>
  );
};

export default WithdrawalMethodContent;
