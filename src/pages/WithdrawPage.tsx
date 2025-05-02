
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { withdrawalMethods } from "@/data/withdrawalMethods";
import WithdrawalMethodTabs from "@/components/withdraw/WithdrawalMethodTabs";
import WithdrawalSummary from "@/components/withdraw/WithdrawalSummary";
import InfoCards from "@/components/withdraw/InfoCards";
import { useWithdrawal } from "@/hooks/useWithdrawal";

const WithdrawPage = () => {
  const {
    amount,
    selectedMethodId,
    cardNumber,
    walletNumber,
    handleAmountChange,
    handleCardNumberChange,
    handleWalletNumberChange,
    setSelectedMethodId,
    getSelectedMethod,
    calculateFee,
    calculateTotal,
    isWithdrawalValid,
    handleWithdraw
  } = useWithdrawal(withdrawalMethods);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Вывод средств</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Выберите способ вывода</CardTitle>
              <CardDescription>
                Выберите удобный способ вывода средств
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <WithdrawalMethodTabs
                methods={withdrawalMethods}
                selectedMethod={selectedMethodId}
                setSelectedMethod={setSelectedMethodId}
                amount={amount}
                handleAmountChange={handleAmountChange}
                cardNumber={cardNumber}
                handleCardNumberChange={handleCardNumberChange}
                walletNumber={walletNumber}
                handleWalletNumberChange={handleWalletNumberChange}
              />
            </CardContent>
            
            <CardFooter>
              <WithdrawalSummary
                selectedMethod={getSelectedMethod()}
                amount={amount}
                fee={calculateFee()}
                total={calculateTotal()}
                isValid={isWithdrawalValid()}
                onWithdraw={handleWithdraw}
              />
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <InfoCards />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
