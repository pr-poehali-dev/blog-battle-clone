import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const withdrawalMethods = [
  { id: "card", name: "Банковская карта", icon: CreditCard, fee: "2%", minAmount: 1000, processingTime: "1-3 дня" },
  { id: "qiwi", name: "QIWI", icon: Wallet, fee: "1.5%", minAmount: 500, processingTime: "Моментально" },
  { id: "webmoney", name: "WebMoney", icon: Wallet, fee: "1%", minAmount: 750, processingTime: "До 24 часов" },
];

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(withdrawalMethods[0].id);
  const [cardNumber, setCardNumber] = useState("");
  const [walletNumber, setWalletNumber] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(event.target.value));
  };

  const handleWalletNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletNumber(event.target.value);
  };

  const getSelectedMethod = () => {
    return withdrawalMethods.find(m => m.id === selectedMethod) || withdrawalMethods[0];
  };

  const calculateFee = () => {
    const method = getSelectedMethod();
    const feePercentage = parseFloat(method.fee.replace("%", "")) / 100;
    const amountValue = amount ? parseInt(amount) : 0;
    return amountValue * feePercentage;
  };

  const calculateTotal = () => {
    const amountValue = amount ? parseInt(amount) : 0;
    return amountValue - calculateFee();
  };

  const handleWithdraw = () => {
    console.log({ 
      amount, 
      selectedMethod, 
      paymentDetails: selectedMethod === "card" ? cardNumber : walletNumber 
    });
    // Здесь должна быть интеграция с платежным шлюзом
  };

  const isWithdrawalValid = () => {
    const method = getSelectedMethod();
    const amountValue = amount ? parseInt(amount) : 0;
    
    if (amountValue < method.minAmount) {
      return false;
    }
    
    if (selectedMethod === "card" && cardNumber.replace(/\s/g, "").length !== 16) {
      return false;
    }
    
    if ((selectedMethod === "qiwi" || selectedMethod === "webmoney") && !walletNumber) {
      return false;
    }
    
    return true;
  };

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
              <Tabs defaultValue={selectedMethod} onValueChange={setSelectedMethod}>
                <TabsList className="bg-background grid grid-cols-3 mb-6">
                  {withdrawalMethods.map(method => (
                    <TabsTrigger key={method.id} value={method.id} className="flex items-center">
                      <method.icon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">{method.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {withdrawalMethods.map(method => (
                  <TabsContent key={method.id} value={method.id} className="space-y-4">
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
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col items-stretch space-y-4">
              <div className="flex justify-between text-sm">
                <span>Комиссия ({getSelectedMethod().fee}):</span>
                <span>-{calculateFee()} ₽</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Итого к получению:</span>
                <span>{calculateTotal()} ₽</span>
              </div>
              <Button 
                className="w-full text-lg py-6" 
                size="lg"
                onClick={handleWithdraw}
                disabled={!isWithdrawalValid()}
              >
                Вывести средства
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="bg-card border-none shadow-lg mb-4">
            <CardHeader>
              <CardTitle>Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Время обработки</h3>
                  <p className="text-sm text-muted-foreground">
                    Зависит от выбранного способа вывода
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Минимальная сумма</h3>
                  <p className="text-sm text-muted-foreground">
                    От 500 ₽ в зависимости от платежной системы
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-950/50 border-amber-900 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-500">Внимание</h3>
                  <p className="text-sm text-amber-500/80 mt-1">
                    Для вывода средств необходимо пройти проверку аккаунта и подтвердить личность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
