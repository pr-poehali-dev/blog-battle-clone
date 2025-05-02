
import { CreditCard, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WithdrawalMethodContent from "./WithdrawalMethodContent";
import { WithdrawalMethod } from "@/types/withdrawal";

interface WithdrawalMethodTabsProps {
  methods: WithdrawalMethod[];
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  amount: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  cardNumber: string;
  handleCardNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  walletNumber: string;
  handleWalletNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithdrawalMethodTabs = ({
  methods,
  selectedMethod,
  setSelectedMethod,
  amount,
  handleAmountChange,
  cardNumber,
  handleCardNumberChange,
  walletNumber,
  handleWalletNumberChange,
}: WithdrawalMethodTabsProps) => {
  return (
    <Tabs defaultValue={selectedMethod} onValueChange={setSelectedMethod}>
      <TabsList className="bg-background grid grid-cols-3 mb-6">
        {methods.map(method => (
          <TabsTrigger key={method.id} value={method.id} className="flex items-center">
            <method.icon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{method.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {methods.map(method => (
        <TabsContent key={method.id} value={method.id} className="space-y-4">
          <WithdrawalMethodContent
            method={method}
            amount={amount}
            handleAmountChange={handleAmountChange}
            cardNumber={cardNumber}
            handleCardNumberChange={handleCardNumberChange}
            walletNumber={walletNumber}
            handleWalletNumberChange={handleWalletNumberChange}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default WithdrawalMethodTabs;
